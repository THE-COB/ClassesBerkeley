class ClassObject {
    constructor(dataJson) {
        this.data = dataJson;
        this.classTitle = this.data.class.course.title;
        this.classTitle = this.classTitle.replaceAll('Vergil', 'Virgil');
        this.classDisplayName = this.data.displayName;
        this.id = this.data.id;
        console.log(this.data);
        try{
            this.instructor = this.data.meetings[0].assignedInstructors[0].instructor.names[0].formattedName;
            for(let i = 1; i<this.data.meetings[0].assignedInstructors.length; i++){
                this.instructor += ", " + this.data.meetings[0].assignedInstructors[i].instructor.names[0].formattedName;
            }
        } catch (e) {
            this.instructor = "";
        }
        try{
            this.meetsDays = this.data.meetings[0].meetsDays.split(/(?=[A-Z])/).join(" ");
        } catch (e) {
            this.meetsDays = "";
        }
        try{
            this.meetTimes = this.data.meetings[0].startTime + ' - ' + this.data.meetings[0].endTime;
        } catch (e) {
            this.meetTimes = "";
        }
        this.instructionMode = this.data.instructionMode.description;
        this.enrollmentStatus = this.data.enrollmentStatus;
        try {
            this.description = this.data.course.description;
        } catch (e) {
            this.description = "";
        }
        this.subject = this.data.class.course.subjectArea.description;
        this.url = `https://classes.berkeley.edu/content/${this.data.displayName.replaceAll(' ', '-')}`
        if(this.data.course === undefined){
            this.berkeleyTime = null;
        }
        else{
            this.berkeleyTime = `https://berkeleytime.com/catalog/${this.data.subjectName}/${this.data.course.catalogNumber.formatted}/`
        }
    }
}

export default ClassObject;
