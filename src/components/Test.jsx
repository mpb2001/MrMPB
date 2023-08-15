import { Component } from 'react';

class Test extends Component {
    state = {
        person: [
            {
                id: 1,
                name: 'Pooya',
                lastname: 'BKH',
                age: '21',
                minscore: 1,
                maxscore: 20,
                score: 0,
            },
            {
                id: 2,
                name: 'Kiana',
                lastname: 'GH',
                age: '22',
                minscore: 1,
                maxscore: 20,
                score: 0,
                parent: 3
            },
            {
                id: 3,
                name: 'Shayan',
                lastname: 'SH',
                age: '22',
                minscore: 1,
                maxscore: 20,
                score: 0,
                parent: 1
            },
            {
                id: 4,
                name: 'Hassan',
                lastname: 'BKH',
                age: '23',
                minscore: 1,
                maxscore: 20,
                score: 0,
                parent: 2
            },
        ],
        score: {
        },
        count: 0
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            const persons = this.state.person.map((person) => ({
                ...person,
                score: Math.floor(person.minscore + Math.random() * (person.maxscore - person.minscore)),
            }));
            this.setState({ person: persons });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    renderPerson = (person) => {
        const { name, lastname, age, score, id } = person;
        let color = 'green';
        if (score < 12) {
            color = 'orange';
            if (score < 10) {
                color = 'red';
            }
        }
        return (
            <div key={id} className='person-card'>
                <div className={`score ${color}`}>{score}</div>
                <div className='details'>
                    <div className='name'>{name} {lastname}</div>
                    <div className='age'>Age: {age}</div>
                </div>
            </div>
        );
    };

    renderParentChildRelationships = (parentId) => {
        return this.state.person.map((prop) => {
            if (prop.parent === parentId) {
                return (
                    <div key={prop.id} className='parent'>
                        Child: {prop.name} {prop.lastname} | Age: {prop.age}
                    </div>
                );
            }
            return null;
        });
    };

    render() {
        return (
            <div className='container'>
                <h1>Person Scores</h1>
                <div className='person-list'>
                    {this.state.person.map((item) => (
                        <div key={item.id} className='person-wrapper'>
                            {this.renderPerson(item)}
                            <div className='children'>{this.renderParentChildRelationships(item.id)}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Test;