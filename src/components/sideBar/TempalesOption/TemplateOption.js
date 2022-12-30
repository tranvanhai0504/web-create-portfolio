import style from './TemplateOption.module.css'
import template1 from '../../../assets/tempalte1.png'
import template2 from '../../../assets/template2.png'
import { useContext, useState } from 'react'
import clsx from 'clsx'
import { MSWContext } from '../../../pages/MainScreenWorkPage/MainScreenWorkProvider/MSWProvider'
import { GlobalContext } from '../../../globalState/GlobalState'
import template from '../../../template/template'

function TemplateOption() {
    const [tempalteSelected, setTemplateSelected] = useState()
    const value = useContext(MSWContext)
    const data = useContext(GlobalContext)

    const templates = [
        {
            name: 'Template 1',
            src: template1,
            id: 1
        },
        {
            name: 'Template 2',
            src: template2,
            id: 2
        },
    ]

    function handleClick(e, id) {

        setTemplateSelected(id)
        const product = template(id)
        value.setData(product.listPage)
        value.setPageSelect(product.listPage[0]?.id)
    }

    return (
        <div className={style.templateOption}>
            {templates.map(template => {
                return (
                    <div onClick={(e) => handleClick(e, template.id)} className={clsx(style.templateContainer, tempalteSelected === template.id && style.target)}>
                        <img className={style.img} alt="template" src={template.src}></img>
                        <div className={style.decription}>
                            <h4 className={style.title}>{template.name}</h4>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default TemplateOption