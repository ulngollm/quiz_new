import Answers from './answers.js';
import Navigation from './navigation.js';
export default class Data {
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
      let {url, list} = data;
      if(url){
        this.data = await Data.getData(url);
        // console.log({data: this.data});
        return this.data;
      } else this.data = list;
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