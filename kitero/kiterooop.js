class Student {
    constructor(name) {
        this.name = name;
        this.askedQuestionNumber = 0;
        this.workDone = 0;
    }

    askQuestion() {
        console.log("?");
        this.askedQuestionNumber++;
    }
}

class StudentWithWork extends Student {
    constructor(name) {
        super(name);
    }

    doWork() {
        this.workDone++;
    }
}

const stu1 = new Student("Lakatos Emánuel+ Pro Max Ultra");

console.log(stu1);
stu1.askQuestion();
console.log(stu1);

const stu2 = new StudentWithWork("Klotild");

console.log(stu2);
stu2.doWork();
stu2.askQuestion();
console.log(stu2);
