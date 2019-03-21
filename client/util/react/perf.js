import React from 'react/addons'

export const stop = ()=> {

    React.addons.Perf.stop()
    React.addons.Perf.printInclusive()
    React.addons.Perf.printExclusive()
    React.addons.Perf.printWasted()
    React.addons.Perf.printDOM()
}

export const start = (ms)=> {
    React.addons.Perf.start()
    if (ms > 0) {
        setTimeout(()=> {
            stop()
        }, ms)
    }
}


//性能分析
//React.addons.Perf.start()
//setTimeout(()=> {
//    React.addons.Perf.stop()
//    React.addons.Perf.printInclusive()
//    React.addons.Perf.printExclusive()
//    React.addons.Perf.printWasted()
//    React.addons.Perf.printDOM()
//    //const resp =  React.addons.Perf.getLastMeasurements()
//    //console.log(resp)
//}, 5000)