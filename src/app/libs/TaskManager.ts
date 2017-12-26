export default class TaskManager {
    private currentTasks: number[] = [];
    private currentTasksIds: {[id: string]: number} = {};

    hasTaskWithId(id: string) {
        return id in this.currentTasksIds;
    }

    postTaskWithId(id: string, f: Function, delay: number = 0) {
        if (id !== null && id in this.currentTasksIds) {
            let taskId = this.currentTasksIds[id];
            window.clearTimeout(taskId);
            delete this.currentTasksIds[id];
            let pos = this.currentTasks.indexOf(taskId);
            if (pos >= 0) {
                this.currentTasks.splice(pos, 1);
            }
        }
        let taskId = window.setTimeout(() => {
            try {
                f();
            } catch (ex) {
                // ignore
            }
            let pos = this.currentTasks.indexOf(taskId);
            if (pos >= 0) {
                this.currentTasks.splice(pos, 1);
            }
            delete this.currentTasksIds[id];
        }, delay);
        this.currentTasks.push(taskId);
        if (id !== null) {
            this.currentTasksIds[id] = taskId;
        }
    }

    postTask(f: Function, delay: number = 0) {
        return this.postTaskWithId(null, f, delay);
    }

    cleanupTasks() {
        for (let taskId of this.currentTasks) {
            window.clearTimeout(taskId);
        }
        this.currentTasks = [];
        this.currentTasksIds = {};
    }
};
