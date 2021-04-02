class Data {
    static data = [];
    static totalSum = 0;
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
    static getTotalSum(historyList){
      historyList.forEach((item, index)=>{
        let questionData = Data.getStepData(item.question);
        this.totalSum += questionData.answers[item.answer].value;
      })
      console.log(this.totalSum);
    }
    static prepareQuizResult(historyList) {
      let result = [];
      historyList.forEach(function (item, answerIndex) {
        let questionData = Data.getStepData(item.question);
        result[answerIndex] = Answers.createAnswer(
          questionData.question,
          questionData.answers[item.answer].text
        );
      });
      if(this.totalSum) result.pop(Answers.createAnswer("Сумма", this.totalSum));
      return result;
    }
  }