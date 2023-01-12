import questions from "../../data/questions";
function QuestionsTable() {
      return (
            <div>
                  <h1>Movies</h1>
                  <table>
                        <thead>
                              <tr>
                                    <th>question</th>

                                    <th></th>
                                    <th></th>
                              </tr>
                        </thead>
                        {questions.map((question) => (
                              <tbody>
                                    <tr key={question.questionId}>
                                          <td>{question.questionContent}</td>
                                          <td>select</td>
                                          <td>delete</td>
                                    </tr>
                              </tbody>
                        ))}
                  </table>
            </div>
      );
}

export default QuestionsTable;
