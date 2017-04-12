Array.prototype.remove = function(object) {
    let index = this.indexOf(object)
    if (index < 0)
        return null
    this.splice(index, 1)
    return object
}

let testItems = [{
    description: 'Do shopping',
    done: true
}, {
    description: 'Do code',
    done: false
}, {
    description: 'Sleep',
    done: false
}]

Vue.component('check-list', {
    template: '#checkListTemplate',
    props: ['title'],
    data: () => ({
        tasks: testItems,
        editing: false,
        newTaskDescription: ''
    }),
    computed: {
        incompleteTasksCount() {
            return this.tasks.filter(task => !task.done).length
        }
    },
    methods: {
        addTask() {
            let description = this.newTaskDescription.trim()
            if (!description || !description.trim()) {
                alert('Please enter a name for your new task.')
                return
            }
            let alreadyExists = !!this.tasks
                .filter(task =>
                    task.description.toLowerCase() ==
                    description.toLowerCase()).length
            if (alreadyExists) {
                alert('This task already exists. Please try another.')
                return
            }
            this.tasks.push({
                description: description.toString(),
                done: false
            })
            this.$emit('tasks-changed', this.tasks)
            this.newTaskDescription = ''
        },
        remove(task) {
            this.tasks.remove(task)
            this.$emit('tasks-changed', this.tasks)
        },
        toggleDone(task) {
            if (this.editing)
                return
            task.done = !task.done
            this.$emit('tasks-changed', this.tasks)
        },
        checkReturnKey(e) {
            if (e.which == 13) //enter key
                this.addTask()
        }
    }
})

let app = new Vue({
    el: '#checkListApp',
    methods: {
        synchroniseWithServer(tasks) {
            //alert('changed')
            console.log('changed')
                //TODO: handle server synchronisation with ajax
        }
    }
})