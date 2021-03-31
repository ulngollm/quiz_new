class Data {
    static data = [];
    static getCurrentStepData() {
      let step = Navigation.currentStep;
      return this.getStepData(step);
    }
    static getStepData(index) {
      return this.data[index];
    }
    static async init(data) {
      if (typeof data == "string") {
        this.data = await this.getData(data);
      } else this.data = data;
    }
    static async getData(url) {
      let response = await fetch(url);
      return await response.json();
    }
    static getResultsList(answersList) {
      let result = [];
      answersList.forEach(function (value, index) {
        let questionData = Data.getStepData(value.question);
        result[index] = Answers.createAnswer(
          questionData.question,
          questionData.answers[value.answer].text
        );
      });
      return result;
    }
  }