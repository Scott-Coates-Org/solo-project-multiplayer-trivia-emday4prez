import questions from "../../data/questions";
function QuestionsTable() {
      return (
            <div>
                  <h1>movie questions</h1>
                  <table>
                        <thead>
                              <tr>
                                    <th>question</th>

                                    <th></th>
                                    <th></th>
                              </tr>
                        </thead>
                        <tbody>
                              {questions.map((question) => (
                                    <tr key={question.questionId}>
                                          <td>{question.questionContent}</td>
                                          <td>
                                                <button>select</button>{" "}
                                          </td>
                                          <td>
                                                <button>delete</button>
                                          </td>
                                    </tr>
                              ))}
                        </tbody>
                  </table>
            </div>
      );
}

export default QuestionsTable;
