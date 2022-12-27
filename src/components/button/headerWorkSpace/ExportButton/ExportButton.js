import styles from './ExportButton.module.css'
import clsx from 'clsx'
import ReactDOM from 'react-dom/client';
import { useContext } from 'react';
import { MSWContext } from '../../../../pages/MainScreenWorkPage/MainScreenWorkProvider/MSWProvider';
import CreatorSpace from '../../../creatorSpace/CreatorSpace';
import { useTranslation } from 'react-i18next'


function ExportButton() {
    const { t, i18n } = useTranslation();

    const data = useContext(MSWContext)

    function makeDocument() {
        // console.log(page.current.outerHTML)

        // const pageStrings = data.data.map(page => {
        //     return ReactDOMServer.renderToStaticMarkup()
        // })

        // console.log(<CreatorSpace style={data.data[0].style} id={data.data[0].id} listItem={data.data[0].listItem} render={true}></CreatorSpace>)

        // const listDoc = pageString.map(page => {

        // })

        
        let doc = document.implementation.createHTMLDocument("New Document");
        const root = ReactDOM.createRoot(doc.body)
        root.render(<CreatorSpace style={data.data[0].style} id={data.data[0].id} listItem={data.data[0].listItem} render={true}></CreatorSpace>)
        console.log(doc)
        // let p = doc.createElement("p");
        // p.textContent = "This is a new paragraph.";

        // try {
        //     doc.body.appendChild(p);
        //     console.log(doc)
        // } catch (e) {
        //     console.log(e);
        // }

        // //now get it's contents and place into a blob
        // const blob = new Blob([doc.documentElement.innerHTML], {
        //     type: 'text/html'
        // });

        // //now convert to url
        // const docUrl = window.URL.createObjectURL(blob);

        // //were done, lets create a href to this and download
        // const aclick = document.createElement('a');
        // aclick.href = docUrl;
        // aclick.download = 'download.html';
        // aclick.click();

        // //tidy up
        // window.URL.revokeObjectURL(docUrl);
    }

    return (
        <button onClick={makeDocument} className={clsx(styles.exportButton)}>{t('exportbtn')}</button>
    )
}

export default ExportButton