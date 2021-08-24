import React, { Component } from 'react';

class App extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            id: '',
            tasks: []
        }
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    deleteTask(id) {
        fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({ html: 'Tarea borrada' });
                this.fetchTasks()
            })
            .catch(err => console.log(err))
    }

    fetchTasks() {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({ tasks: data })
            })
    }

    updateTask(value){
        const {_id, title, description} = value;
        this.setState({ title: title, description: description, id: _id })
    }
    
    addTask(e) {
        let id = e.target.attributes.id.value;
        if(id){
            //update
            fetch(`/api/tasks/${id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({ html: 'Tarea editada' });
                    this.fetchTasks()
                })
                .catch(err => console.log(err))
        }else{
            //add
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({ html: 'Tarea almacenada' });
                    this.setState({ title: '', description: '', id: '' })
                    this.fetchTasks();
                })
                .catch(err => console.log(err))
            e.preventDefault();
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    componentDidMount() {
        this.fetchTasks();
    }

    render() {
        return (
            <div>
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a href="/" className="brand-logo">MERN STACK</a>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask} id={this.state.id} >
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" type="text" placeholder="Titulo" onChange={this.handleChange} value={this.state.title} />

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" placeholder="Task Description" onChange={this.handleChange} className="materialize-textarea" value={this.state.description}></textarea>
                                            </div>
                                        </div>
                                        <button className="btn light-blue darken-4">
                                            Enviar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s5">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.tasks.map((value, key) => {
                                        return <tr key={key}>
                                            <th>
                                               {value.title}
                                            </th>
                                            <th>
                                                {value.description}
                                            </th>
                                            <td>
                                                <button
                                                    className="btn red darken-4"
                                                    onClick={() => this.deleteTask(value._id)}
                                                    style={{ margin: '4px' }}>
                                                    <i className="material-icons">delete</i>
                                                </button>
                                                <button
                                                    className="btn light-blue darken-4"
                                                    onClick={() => this.updateTask(value)}
                                                    style={{ margin: '4px' }}>
                                                    <i className="material-icons">edit</i>
                                                </button>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;