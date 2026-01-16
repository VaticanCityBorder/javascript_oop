function Student(name) {
    this.name = name;
    this.askedQuestionNumber = 0;
    this.workDone = 0;
}

Student.prototype.askQuestion = function() {
    console.log("?");
    this.askedQuestionNumber++;
}

Student.prototype.doWork = function() {
    this.workDone++;
}

function StudentWithWork(name) {
    Student.call(this, name);
}
Object.setPrototypeOf(StudentWithWork.prototype, Student.prototype);


const stu1 = new Student("Csinszka");
console.log(stu1);
stu1.askQuestion();
console.log(stu1);

const stu2 = new Student("Klotild");
console.log(stu2);

const stu3 = new StudentWithWork("Lorem Ipsum");
console.log(stu3);
stu3.askQuestion();
console.log(stu3);
stu3.doWork();
console.log(stu3);
