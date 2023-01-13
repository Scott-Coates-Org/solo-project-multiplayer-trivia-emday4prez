import answers from "../../data/answers";
function AnswersTable() {
      return (
            <div>
                  <h1> movie answers</h1>
                  <table>
                        <thead>
                              <tr>
                                    <th>answer</th>
                                    <th>correct</th>
                                    <th></th>
                                    <th></th>
                              </tr>
                        </thead>
                        <tbody>
                              {answers.map((answer) => (
                                    <tr key={answer.answerId}>
                                          <td>{answer.answerContent}</td>
                                          <td>
                                                {answer.correct ? (
                                                      <input
                                                            type="radio"
                                                            checked
                                                            readOnly
                                                      />
                                                ) : (
                                                      <input
                                                            type="radio"
                                                            readOnly
                                                      />
                                                )}
                                          </td>
                                          <td>
                                                <button>correct</button>
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

export default AnswersTable;
