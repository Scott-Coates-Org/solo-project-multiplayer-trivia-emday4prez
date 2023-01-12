import styles from "./CategoryTable.module.css";
import categories from "../../data/categories";
function CategoryTable() {
      return (
            <div>
                  <h1>edit game categories</h1>
                  <table>
                        <thead>
                              <tr>
                                    <th>Category Name</th>
                                    <th>Question Count</th>
                                    <th>Last Updated</th>
                                    <th></th>
                                    <th></th>
                              </tr>
                        </thead>
                        <tbody>
                              {categories.map((category) => (
                                    <tr key={category.categoryId}>
                                          <td>{category.categoryName}</td>
                                          <td>{category.questionCount}</td>
                                          <td>{category.lastUpdated}</td>
                                          <td>select</td>
                                          <td>delete</td>
                                    </tr>
                              ))}
                        </tbody>
                  </table>
            </div>
      );
}

export default CategoryTable;
