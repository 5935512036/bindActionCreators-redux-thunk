let express = require('express')
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();
app.use(cors());

app.use('/api', bodyParser.json(), router);
app.use('/api', bodyParser.urlencoded({ extended: false }), router);


let students = [
    {
        id: '5935512001',
        name: 'KRITTAMET',
        surname: 'PETCHKOR',
        major: 'COMPUTER ENGINEERING',
        GPA: 3.00
    },
    {
        id: '5935512003',
        name: 'NAPAT',
        surname: 'OLANWICHITWONG',
        major: 'COMPUTER ENGINEERING',
        GPA: 2.90
    },
    {
        id: '5935512004',
        name: 'NATTAPON',
        surname: 'LUEAKAEW',
        major: 'COMPUTER ENGINEERING',
        GPA: 3.25
    },
    {
        id: '59355120030',
        name: 'ISMAAL',
        surname: 'HAMA',
        major: 'COMPUTER ENGINEERING',
        GPA: 3.50
    },
    {
        id: '59355120036',
        name: 'USMAN',
        surname: 'SULONG',
        major: 'COMPUTER ENGINEERING',
        GPA: 2.75 
    },
    {
        id: '59355120074',
        name: 'MADSOFEE',
        surname: 'YAKO',
        major: 'COMPUTER ENGINEERING',
        GPA: 2.80 
    }
]

router.route('/students')
    .get((req, res) => res.json(students))
    .post((req, res) => {
        var student = {}
        student.id = req.body.id
        student.name = req.body.name
        student.surname = req.body.surname
        student.major = req.body.major
        student.GPA = req.body.GPA
        students.push(student)
        res.json({ massege: 'Student created!' })
    })

router.route('/students/:student_id')
    .get((req, res) => {
        let id = req.params.student_id
        let index = students.findIndex(student => (student.id === id))
        res.json(students[index])
    })

    .put((req, res) => {
        let id = req.params.student_id
        let index = students.findIndex(student => (student.id === id))
        students[index].name = req.body.name
        students[index].surname = req.body.surname
        students[index].major = req.body.major
        students[index].GPA = req.body.GPA
        res.json({ message: 'Student updated!' + req.params.student_id })
    })

    .delete((req, res) => {
        // delete  เช็คจาก id
        let id = req.params.student_id
        let index = students.findIndex(student => (student.id === id))
        students.splice(index, 1)
        res.json({ message: 'deleted: ' + req.params.student_id });
    })


app.use("*", (req, res) => res.status(404).send('404 Not Found'))
app.listen(8000, () => console.log('Server is running'))