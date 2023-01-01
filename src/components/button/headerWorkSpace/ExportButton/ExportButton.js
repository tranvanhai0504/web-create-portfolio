import styles from './ExportButton.module.css'
import clsx from 'clsx'
import React from 'react'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import ReactDOMServer from 'react-dom/server'
import { useContext } from 'react';
import { MSWContext } from '../../../../pages/MainScreenWorkPage/MainScreenWorkProvider/MSWProvider';
import { GlobalContext } from '../../../../globalState/GlobalState';
import CreatorSpace from '../../../creatorSpace/CreatorSpace';
import { useTranslation } from 'react-i18next'


function ExportButton() {
    const { t, i18n } = useTranslation();

    const data = useContext(MSWContext)
    const value = useContext(GlobalContext)

    function makeDocument() {

        var zip = new JSZip();
        let nameProduct

        data.data.forEach((page, index) => {
            page.listItem.forEach(item => {
                if(item.type === 'button' && item.direct === data.data[0].id){
                    item.direct = 'index'
                }
            })

            value.produces.forEach(product => {
                if(product.id === value.produceSelect){
                    nameProduct = product.name
                }
            })

            let doc = document.implementation.createHTMLDocument(`${nameProduct}`);
            const content = ReactDOMServer.renderToString(<CreatorSpace style={page.style} id={page.id} listItem={page.listItem} render={true}></CreatorSpace>)
            const styleTags = document.querySelectorAll('style')
            styleTags.forEach((tag, index) => {
                if(!tag.classList.contains('__web-inspector-hide-shortcut__'))
                    doc.head.appendChild(tag.cloneNode(true))
            })
            var newContent = content.replaceAll(/&quot;/g, '')
            newContent = newContent.replaceAll('vhpx', 'vh')
            newContent = newContent.replaceAll('vwpx', 'vw')
            doc.body.innerHTML = newContent

            //now get it's contents and place into a blob
            const blob = new Blob([doc.documentElement.innerHTML], {
                type: 'text/html'
            });
            if(index === 0){
                zip.file('index.html', blob)
            }else{
                zip.file(`${page.id}.html`, blob)
            }
        })

        zip.generateAsync({ type: "blob" })
            .then(function (content) {
                // Force down of the Zip file
                saveAs(content, `${nameProduct}.zip`);
            });
    }

    return (
        <button onClick={makeDocument} className={clsx(styles.exportButton)}>{t('exportbtn')}</button>
    )
}

export default ExportButton