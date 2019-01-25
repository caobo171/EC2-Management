import { Container } from 'unstated-x'


class SelectContainer extends Container {
    state = {
        instance:null,
        region :null
    }
}

const selectContainer = new SelectContainer()
export default selectContainer 