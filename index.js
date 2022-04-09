const { createWorker } = require('tesseract.js');

// const trained_data = 'eng+hin'
const ReadText = (imgfile, oem, psm) => {

    const oem_var = oem || 2
    const psm_var = psm || 3

    try {
        return new Promise((resolve, reject) => {
            const worker = createWorker({
                //   logger: m => console.log(m)
            });
            worker.load().then(() => {
                worker.loadLanguage('digits+digits1').then(() => {
                    worker.initialize('digits+digits1').then(() => {
                        worker.setParameters({
                            tessedit_ocr_engine_mode: oem_var,
                            tessedit_pageseg_mode: psm_var,
                            tessedit_char_whitelist: '0123456789'
                        }).then(() => {
                            worker.recognize(imgfile, {
                                tessedit_char_whitelist: '0123456789'
                            }).then(({ data: { text } }) => {
                                // console.log(text)
                                resolve(text)
                            }).finally(() => {
                                
                            })
                        })
                    });
                })
            })

        });

    }
    catch (e) {
        return `An error occurred: ${e}`
    }
}










module.exports = ReadText
