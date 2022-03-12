import { useMain } from "../../store/main";
import { ref } from 'vue'


export const getRandomHeadshot = () => {
    const main = useMain()

    const images = main.getDefaults.headshots
    const max = images.length

    if(max === 0) {
        return false
    }
    const headshot = ref('')

    headshot.value = images[Math.floor(Math.random(0, max+1))]

    return headshot
}