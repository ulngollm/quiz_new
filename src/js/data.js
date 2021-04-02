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
      let sum = 0;
      answersList.forEach(function (item, index) {
        let questionData = Data.getStepData(item.question);
        sum += questionData.answers[item.answer].value,
        result[index] = Answers.createAnswer(
          questionData.question,
          questionData.answers[item.answer].text
        );
      });
      result.push(Answers.createAnswer("Сумма", sum));
      console.log(result);
      return result;
    }
  }