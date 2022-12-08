import { useDrag } from 'react-dnd'
import Block from '../items/Block/Block'
import Text from '../items/Text/Text'
import ImgBox from '../items/ImgBox/ImgBox'
import Draggable from './DragDrop/Draggable'
import {Droppable} from './DragDrop/Droppable'

function CreateItem(type) {
    
    switch(type){
        case 'block' : {
            return <Draggable><Block /></Draggable>
        }
        case 'text': {
            return  <Draggable>
                        <Text />
                    </Draggable>
        }
        case 'imgBlock': {
            return <Draggable>
                    <ImgBox />
                </Draggable>
            
        }
        default: {
            
        }
    }
}
export default CreateItem;