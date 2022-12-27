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

        data.data.forEach((page, index) => {
            page.listItem.forEach(item => {
                if(item.type === 'button' && item.direct === data.data[0].id){
                    item.direct = 'index'
                }
            })

            let doc = document.implementation.createHTMLDocument("New Document");
            const content = ReactDOMServer.renderToString(<CreatorSpace style={page.style} id={page.id} listItem={page.listItem} render={true}></CreatorSpace>)
            const styleTags = document.querySelectorAll('style')
            styleTags.forEach(tag => {
                doc.head.appendChild(tag.cloneNode(true))
            })
            var newContent = content.replace(/&quot;/g, '')
            console.log(newContent)
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
                saveAs(content, `${value.produceSelect}.zip`);
            });
    }

    return (
        <button onClick={makeDocument} className={clsx(styles.exportButton)}>{t('exportbtn')}</button>
    )
}

export default ExportButton