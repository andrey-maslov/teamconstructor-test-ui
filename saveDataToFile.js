const fs = require('fs')
const fns = require('date-fns')

module.exports = (req, res, next) => {
    if (req.method === 'POST') {
        const body = []
        req.on('data', chunk => {
            body.push(chunk)
        })
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            const { teammate, personalInfo, testData, start, end } = JSON.parse(parsedBody)

            const encData = Buffer.from(JSON.stringify([personalInfo, testData])).toString('base64')
            const duration = fns.intervalToDuration({ start, end })
            const date = fns.format(new Date(), 'dd-MM-yyyy')
            const formattedDuration = `${duration.hours}h:${duration.minutes}min:${duration.seconds}sec`

            const msg = `${teammate},${date},${formattedDuration},${encData}\n`

            fs.appendFile('staff.csv', msg, error => {
                if (error) {
                    throw new Error()
                }
            })
        })
        res.end()
    }
}