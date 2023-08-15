/* eslint-disable react/jsx-key */
import { Component } from 'react'

export default class Test extends Component {

    componentDidMount() {

        this.interval = setInterval(() => {
            let persons = this.state.person
            for (let i = 0; i < persons.length; i++) {
                let person = persons[i];
                // console.log('i', Math.floor(person.minscore + Math.random() * (person.maxscore - person.minscore)))
                person.score = Math.floor(person.minscore + Math.random() * (person.maxscore - person.minscore))
                // console.log('person', person)
                this.setState({ person: persons })
            }

        }, 1000);

    }


    state = {

        person: [{
            id: 1,
            name: 'kiana', lastname: 'GH',
            age: '21', minscore: 1,
            maxscore: 20,
            score: 0
        },
        {
            id: 2,
            name: 'helia', lastname: 'GH',
            age: '23', minscore: 1,
            maxscore: 20,
            score: 0,
            parent: 3
        },
        {
            id: 3,
            name: 'amir', lastname: 'akbari',
            age: '22', minscore: 1,
            maxscore: 20,
            score: 0,
            parent: 1
        },
        {
            id: 4,
            name: 'pouya', lastname: 'bakhtiyarna',
            age: '23', minscore: 1,
            maxscore: 20,
            score: 0,
            parent: 2
        },
        ],
        score: {
        },
        count: 0
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    render() {
        return (
            <div>
                <ul className='list' >

                    {this.state.person.map((item, index) => {

                        let color = 'green'
                        if (item.score < 12) {
                            color = 'orange'

                            if (item.score < 10) {
                                color = 'red'
                            }
                        }
                        return (
                            <div key={index} className='list-line'>
                                <span>
                                    <li className='list-item'> Name: {item.name}</li>
                                </span>
                                <span>
                                    <li className='list-item'>Last Name: {item.lastname}</li>
                                </span>
                                <span>
                                    <li className='list-item'> Age :{item.age}</li>
                                </span>
                                <span>

                                    <li className='list-item' style={{ color }}>Score :{item.score} </li>

                                </span>
                                <span>
                                    <li className='list-item'> Id  :{item.id}</li>
                                </span>

                                <ul>
                                    {this.state.person.map((prop, index) => {

                                        {/* console.log("parent", this.state.person[index].parent, prop.id) */ }

                                        if (prop.parent == item.id) {
                                            return (
                                                <div className='main-layout'>
                                                    <li className='parent'> Name: {prop.name}{"  "}, Last Name: {prop.lastname} {"  "}, Age: {prop.age}</li>
                                                </div>
                                            )
                                        }

                                    })}

                                </ul>
                            </div>
                        )
                    })}
                </ul>


            </div>
        )
    }
}