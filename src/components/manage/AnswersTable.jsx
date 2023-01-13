import answers from "../../data/answers";
function AnswersTable() {
      return (
            <div>
                  <table>
                        <thead>
                              <tr>
                                    <th>answer</th>

                                    <th></th>
                                    <th></th>
                              </tr>
                        </thead>
                        <tbody>
                              {answers.map((answer) => (
                                    <tr key={answer.answerId}>
                                          <td>{answer.answerContent}</td>
                                          <td>select</td>
                                          <td>delete</td>
                                    </tr>
                              ))}
                        </tbody>
                  </table>
            </div>
      );
}

export default AnswersTable;
