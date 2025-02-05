import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */
export function getPublishedQuestions(questions: Question[]): Question[] {
    const publishedQuestions: Question[] = questions.filter(
        (question: Question): boolean => question.published
    );

    return publishedQuestions;
}

/**
 * Consumes an array of questions and returns a new array of only the questions that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    //my assumptions will be the death of me.
    //was originally using &&s

    const nonEmptyQuestions: Question[] = questions.filter(
        (question: Question): boolean =>
            Boolean(question.body) ||
            Boolean(question.expected) ||
            Boolean(question.options.length)
    );

    return nonEmptyQuestions;
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */
export function findQuestion(
    questions: Question[],
    id: number
): Question | null {
    const matchedQuestion = questions.find(
        (question: Question) => question.id === id
    );

    return matchedQuestion ? matchedQuestion : null;
}

/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */
export function removeQuestion(questions: Question[], id: number): Question[] {
    const rmQuestions: Question[] = questions.filter(
        (question: Question): boolean => question.id !== id
    );

    return rmQuestions;
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */
export function getNames(questions: Question[]): string[] {
    //rm questions with no name (just in case)
    const withNames: Question[] = questions.filter(
        (question: Question): boolean => Boolean(question.name)
    );

    const names: string[] = withNames.map(
        (question: Question): string => question.name
    );

    return names;
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */
export function sumPoints(questions: Question[]): number {
    const pointSum = questions.reduce(
        (sum: number, question: Question) => sum + question.points,
        0 // initial value == 0
    );

    return pointSum;
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions.
 */
export function sumPublishedPoints(questions: Question[]): number {
    const publishedPoints = questions.filter(
        (question: Question): boolean => question.published
    );

    const publishedSum = publishedPoints.reduce(
        (sum: number, question: Question) => sum + question.points,
        0 // init value
    );

    return publishedSum;
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */
export function toCSV(questions: Question[]): string {
    //fn to reduce a question to a csv-friendly string
    function questionToStr(question: Question): string {
        return `${question.id},${question.name},${question.options.length},${question.points},${question.published}`;
    }

    const questionCSV = questions.map((question: Question): string =>
        questionToStr(question)
    );

    const headerStr = "id,name,options,points,published\n";

    return headerStr + questionCSV.join("\n");
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 */
export function makeAnswers(questions: Question[]): Answer[] {
    interface Answer {
        questionId: number;
        text: string;
        submitted: boolean;
        correct: boolean;
    }

    const answers: Answer[] = questions.map((question: Question): Answer => {
        return {
            questionId: question.id,
            text: "",
            submitted: false,
            correct: false
        };
    });

    return answers;
}

/***
 * Consumes an array of Questions and produces a new array of questions, where
 * each question is now published, regardless of its previous published status.
 */
export function publishAll(questions: Question[]): Question[] {
    const allPublished = questions.map((question: Question): Question => {
        return {
            ...question,
            published: true
        };
    });

    return allPublished;
}

/***
 * Consumes an array of Questions and produces whether or not all the questions
 * are the same type. They can be any type, as long as they are all the SAME type.
 */
export function sameType(questions: Question[]): boolean {
    if (questions.length === 0) {
        return true;
    }

    const firstType = questions[0].type;

    function isSameType(question: Question, type: string): boolean {
        return String(question.type) === type;
    }

    const isAllSameType: boolean = questions.every(
        (question: Question): boolean => isSameType(question, firstType)
    );

    return isAllSameType;
}

/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the `makeBlankQuestion`
 * you defined in the `objects.ts` file.
 */
export function addNewQuestion( // I love typescript but it looks horrendous
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType
): Question[] {
    function makeBlankQuestion(
        id: number,
        name: string,
        type: QuestionType
    ): Question {
        const blankQuestion: Question = {
            id: id,
            name: name,
            body: "",
            type: type,
            options: [],
            expected: "",
            points: 1,
            published: false
        };

        return blankQuestion;
    }

    const questionsDeepCopy = questions.map(
        (question: Question): Question => ({ ...question })
    );

    questionsDeepCopy.push(makeBlankQuestion(id, name, type));

    return questionsDeepCopy;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string
): Question[] {
    const withNewId = questions.map(
        (question: Question): Question =>
            question.id === targetId
                ? { ...question, name: newName }
                : { ...question }
    );

    return withNewId;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `type` should now be the `newQuestionType`
 * AND if the `newQuestionType` is no longer "multiple_choice_question" than the `options`
 * must be set to an empty list.
 */
export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType
): Question[] {
    function isNoLongerMultipleChoice(
        question: Question,
        newType: QuestionType
    ): string[] | [] {
        if (
            question.type === "multiple_choice_question" &&
            newType !== "multiple_choice_question"
        ) {
            return [];
        } else {
            return question.options;
        }
    }

    //i wanted to ternary this but there's a collision between prettier and the linter :(
    const withChangedType = questions.map((question: Question): Question => {
        if (question.id === targetId) {
            return {
                ...question,
                type: newQuestionType,
                options: isNoLongerMultipleChoice(question, newQuestionType)
            };
        } else return { ...question };
    });

    return withChangedType;
}

/**
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `option` array should have a new element.
 * If the `targetOptionIndex` is -1, the `newOption` should be added to the end of the list.
 * Otherwise, it should *replace* the existing element at the `targetOptionIndex`.
 *
 * Remember, if a function starts getting too complicated, think about how a helper function
 * can make it simpler! Break down complicated tasks into little pieces.
 */
export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string
): Question[] {
    function insertOption(question: Question): Question {
        if (targetOptionIndex === -1) {
            const newOptions = [...question.options, newOption];
            return { ...question, options: newOptions };
        } else {
            const newOptions = question.options.with(
                targetOptionIndex,
                newOption
            );
            return { ...question, options: newOptions };
        }
    }

    const newQuestions = questions.map((question: Question): Question => {
        if (question.id === targetId) {
            return insertOption(question);
        } else {
            return { ...question };
        }
    });

    return newQuestions;
}

/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id `targetId` should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the `duplicateQuestion`
 * function you defined previously; the `newId` is the parameter to use for the duplicate's ID.
 */
export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number
): Question[] {
    function duplicateQuestion(id: number, oldQuestion: Question): Question {
        const newQuestion = {
            ...oldQuestion,
            id: id,
            name: `Copy of ${oldQuestion.name}`,
            published: false
        };

        return newQuestion;
    }

    const outQuestions: Question[] = [];

    questions.forEach((question: Question) => {
        outQuestions.push({ ...question });
        if (question.id === targetId) {
            outQuestions.push(duplicateQuestion(newId, question));
        }
    });

    return outQuestions;
}
