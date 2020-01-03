import Day from './models/day.js'

const tableCapacity = 4;
const maxTablesCount = 10
const openigHours = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

const getReservations = async (req, res) => {
    if(!req.body.date) return res.status(400).json({ message: "missing date parameter like 2020-01-22" });
    if(!req.body.personCount || isNaN(req.body.personCount)) return res.status(400).json({ message: "missing personCount parameter of type number" });

    try {
        const day = await Day.findOne({ date: { "$eq": req.body.date } });
        if (day) {
            let hours = createHours(day, req.body.personCount);
            return res.status(200).json({ date: day.date, hours: hours });
        }
        else {
            newDay = { date: req.body.date, hours: openigHours }
            return res.status(200).json(newDay);
        }

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const createHours = (day, personCount) => {
    let tableCount = getTablesCount(personCount)
    let hoursToExclude = day.hours.filter(h => h.count + tableCount > maxTablesCount).map(h => h.hour);
    let hours = [];
        openigHours.forEach(element => {
        let isHourToExclude = hoursToExclude.includes(element);
        if (!isHourToExclude && tableCount < maxTablesCount){
            hours.push(element);
        }
            
    });
    return hours;
}

const addReservation = async (req, res) => {
    if(!req.body.date) return res.status(400).json({ message: "missing date parameter like 2020-01-22" });
    if(!req.body.personCount || isNaN(req.body.personCount)) return res.status(400).json({ message: "missing personCount parameter of type number" });
    if(!req.body.hour || isNaN(req.body.hour)) return res.status(400).json({ message: "missing hour parameter of type number" });
    if(!openigHours.includes(req.body.hour)) return res.status(400).json({ message: "you can't reserve for this hour because we are closed at that time" });
    

    try {
        var day = await Day.findOne({ date: { "$eq": req.body.date } });
        if (day) {
            let hour = day.hours.find(x => x.hour == req.body.hour);
            let count = getTablesCount(req.body.personCount)
            if (count > maxTablesCount) return res.status(400).json({ message: "not enough space for reservations" });
            if (hour) {
                if (count + hour.count <= maxTablesCount)
                    hour.count = count + hour.count;
                else{
                    return res.status(400).json({ message: "not enough space for reservations" });
                }
            }
            else {
                day.hours.push({ hour: req.body.hour, count: count });
            }
        }
        else {
            day = new Day({
                date: req.body.date,
                hours: [{ hour: req.body.hour, count: req.body.personCount }]
            })
        }

    //try{
        const newDay = await day.save()
        return res.status(201).json(newDay);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const getTablesCount = (personCount) => {
    return Math.ceil((personCount / tableCapacity));
}

export { getReservations, addReservation };