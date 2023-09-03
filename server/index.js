import * as fs from "fs";
import path, { dirname } from "path";
import express from "express";

import { createServer as _createServer } from "vite";
import serveStatic from "serve-static";
import compression from "compression";
import { fileURLToPath } from "url";

const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;

async function createServer(
    root = process.cwd(),
    isProd = process.env.NODE_ENV === "production"
) {
    const resolve = (p) => {
        const _path = path.resolve(dirname(fileURLToPath(import.meta.url)), p);
        return _path;
    };

    // const manifest = isProd ?
    //     require('../dist/client/ssr-manifest.json') : {}
    const manifest = {};
    const app = express();

    let _vite = null;
    if (!isProd) {
        _vite = await _createServer({
            root,
            logLevel: isTest ? "error" : "info",
            server: {
                middlewareMode: "ssr",
                watch: {
                    // During tests we edit the files too fast and sometimes chokidar
                    // misses change events, so enforce polling for consistency
                    usePolling: true,
                    interval: 100,
                },
            },
        });
        // use vite's connect instance as middleware
        app.use(_vite.middlewares);
    } else {
        app.use(compression());
        app.use(
            serveStatic(resolve("../dist/client"), {
                index: false,
            })
        );
    }

    app.use("*", async (req, res) => {
        try {
            const url = req.originalUrl;
            let template, render;
            if (_vite !== null && !isProd) {
                // always read fresh template in dev
                template = fs.readFileSync(resolve("../index.html"), "utf-8");
                template = await _vite.transformIndexHtml(url, template);

                render = (
                    await _vite.ssrLoadModule(resolve("../src/entry-server.js"))
                ).render;
            } else {
                template = fs.readFileSync(
                    resolve("../dist/client/index.html"),
                    "utf-8"
                );
                let modulename = "../dist/server/entry-server.js";
                render = (await import(modulename)).render;
            }
            const html = await render(url, manifest, template);
            res.status(200).set({ "Content-Type": "text/html" }).end(html);
        } catch (e) {
            _vite && _vite.ssrFixStacktrace(e);
            console.log(e.stack);
            res.status(500).end(e.stack);
        }
    });

    return { app, _vite };
}

let server
createServer().then(({ app }) =>
    server = app.listen(5173, () => {
        console.log("http://localhost:5173");
    })
);

// Handle signals
// The signals we want to handle
// NOTE: although it is tempting, the SIGKILL signal (9) cannot be intercepted and handled
var signals = {
    SIGHUP: 1,
    SIGINT: 2,
    SIGTERM: 15,
};
// Do any necessary shutdown logic for our application here
const shutdown = (signal, value) => {
    console.log("shutdown!");
    server.close(() => {
        process.exit(128 + value);
    });
};
// Create a listener for each of the signals that we want to handle
Object.keys(signals).forEach((signal) => {
    process.on(signal, () => {
        console.log(`process received a ${signal} signal`);
        shutdown(signal, signals[signal]);
    });
});

// for test use
export { createServer };
