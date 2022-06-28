class ClassObject {
    constructor(dataJson, setParams) {
        if(setParams !== null){
            this.data = {

            }
            this.classTitle = setParams.classTitle
            this.classDisplayName = setParams.classDisplayName
            this.id = setParams.id
            this.description = setParams.description
            this.enrollmentStatus = {
                enrolledCount:0,
                maxEnroll:0,
                maxWaitlist: 0,
                minEnroll: 0,
                openReserved: 0,
                reservedCount: 0,
                waitlistedCount: 0,
                status: {code: 'C', description: 'Closed'}
            }
            this.instructionMode = setParams.instructionMode
            this.instructor = setParams.instructor
            this.subject = setParams.subject
            this.url = setParams.url
            this.berkeleyTime = setParams.url
            return
        }
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
        if(this.data.hasOwnProperty("enrollmentStatus")){
            this.enrollmentStatus = this.data.enrollmentStatus;
        }
        else {
            this.enrollmentStatus = {
                enrolledCount:0,
                maxEnroll:0,
                maxWaitlist: 0,
                minEnroll: 0,
                openReserved: 0,
                reservedCount: 0,
                waitlistedCount: 0,
                status: {code: 'C', description: 'Closed'}
            }
        }
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
        console.log(this)
    }
}

let joysClass = new ClassObject(null, {
    classTitle: "Introduction to Spotify Playlists",
    classDisplayName: "20XX JOKECLASS 001 LEC 001",
    id: 1,
    description: "This course is and intoduction to Spotify Playlists with emphasis on the history of playlists, popular design techniques, and the importance of names. Students will be exposed to some of the best Spotify playlists across genres and will work in teams to build playlists of their own",
    instructionMode: "In-Person Instruction",
    instructor: "Anonymous Donor",
    subject: "Fake Classes",
    url: "https://docs.google.com/document/d/1ZT_LdIdgnP3uAJUOcZ961IxLnwLybDp0ZvHyJsBwcIY/edit?usp=sharing"
})
let fakeClasses = [joysClass]

export default ClassObject;

export {fakeClasses}
