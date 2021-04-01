let jobLangArr = [
    {Code: "zh-CN", Msg: "中文-简体", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589280018_2x5GLhzOd3.png"},
    {Code: "en-M", Msg: "American English", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589279372_SxygLbLHET.png"},
    {Code: "en", Msg: "British English", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1593431784_Jre6ykDnJ7.png"},
    {Code: "ja", Msg: "日本語", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589279548_4yz5inuqRD.png"},
    {Code: "zh-TW", Msg: "中文-繁體", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589280018_2x5GLhzOd3.png"},
    {Code: "ko", Msg: "한국어", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589278788_to5IX2kGkV.png"},
    {Code: "ar", Msg: "عربى", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589279590_zfUHMVH6H4.png"},
    {Code: "de", Msg: "Deutsche", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589278586_qmM3UKP7Lz.png"},
    {Code: "fr", Msg: "français", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589278670_HXcD5LKqzV.png"},
    {Code: "nl", Msg: "Nederlands", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589278927_TvpUhn11fh.png"},
    {Code: "hu", Msg: "Magyar", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589279838_Wa9HeXYKvb.png"},
    {Code: "sq", Msg: "shqiptar", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589276388_0lMUC3A10E.png"},
    {Code: "hr", Msg: "Hrvatski", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589279141_HK4ve7G0VL.png"},
    {Code: "fa", Msg: "فارسی", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589277118_63FHmhRLGL.png"},
    {Code: "id", Msg: "bahasa Indonesia", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589279892_lKsed15ODN.png"},
    {Code: "pt", Msg: "Português", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589279529_weZSOfsGGI.png"},
    {Code: "hy", Msg: "հայերեն", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589279853_imFBKAB1Gg.png"},
    {Code: "lv", Msg: "Latvietis", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589279166_1MxoU4A2bl.png"},
    {Code: "mk", Msg: "Македонски", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589279324_cUJHR6z9ch.png"},
    {Code: "is", Msg: "Íslensku", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589277054_Fwhp93JSYO.png"},
    {Code: "th", Msg: "ไทย", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589279720_Ok6ZJLSKDu.png"},
    {Code: "tr", Msg: "Türk", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589279741_Zvm1sZcUpg.png"},
    {Code: "el", Msg: "Ελληνικά", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589279816_v3TJeR0BZd.png"},
    {Code: "hi", Msg: "हिन्दी", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589276996_clS0F5yKWI.png"},
    {Code: "ms", Msg: "Bahasa Melayu", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589279294_SpxuwE8izD.png"},
    {Code: "eu", Msg: "Euskal", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589276880_Np628k7Tbq.png"},
    {Code: "ca", Msg: "Català", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589278985_4Yztv95fnq.png"},
    {Code: "cs", Msg: "čeština", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589279044_kzXJ3zdeKb.png"},
    {Code: "sl", Msg: "Slovenščina", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589279696_BEbFBM03oL.png"},
    {Code: "es", Msg: "Español", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589279783_MSOdl9zFq4.png"},
    {Code: "fi", Msg: "Suomalainen", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589278740_ikwK3CIGig.png"},
    {Code: "he", Msg: "עִברִית", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589279800_fwMlQa0WJ2.png"},
    {Code: "lt", Msg: "Lietuvis", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589279194_LuMyiw20YZ.png"},
    {Code: "ro", Msg: "Română", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589279227_ez5ruFKzVN.png"},
    {Code: "vi", Msg: "Tiếng Việt", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589279939_hLddq4QXt3.png"},
    {Code: "bg", Msg: "български", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589279227_ez5ruFKzVN.png"},
    {Code: "mr", Msg: "मराठी", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589279264_d3PgJ0Fi9W.png"},
    {Code: "sv", Msg: "svenska", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589279563_qXq3UDkIwH.png"},
    {Code: "no", Msg: "norsk", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589279489_w2E0gmoIIJ.png"},
    {Code: "pl", Msg: "Polskie", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589277097_92sad3crmD.png"},
    {Code: "ru", Msg: "русский", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589278637_ZLOhsCTzKc.png"},
    {Code: "et", Msg: "Eestlane", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589276827_XlNJCQfREj.png"},
    {Code: "gl", Msg: "Galego", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589278957_HHBZa01Chl.png"},
    {Code: "it", Msg: "italiano", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589279874_pu4SWZcQ8V.png"},
    {Code: "kn", Msg: "ಕನ್ನಡ", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589279083_RYN28wP4y0.png"},
    {Code: "sk", Msg: "slovenský", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589279639_JM2BmxIZ9s.png"},
    {Code: "uk", Msg: "Українська", Ico: "https://static.goodjob.ai/v1/storage/ktt/images/capture/1_1589279762_c43EoXxXYJ.png"}
]

let jbLangObj={}

jobLangArr.forEach(item=>{
    jbLangObj[item.Code]=item
})

/**
 * @desc 防抖函数
 * @param {需要防抖的函数} func
 * @param {延迟时间} wait
 * @param {是否立即执行} immediate
 */
 export const DebounceFunc = (function () {
    let timeId = null
    return function (fn, delay = 300) {
      timeId && clearTimeout(timeId)
      timeId = setTimeout(() => {
        fn.apply(this, arguments)
        timeId = null
      }, delay)
    }
})()

export default jbLangObj