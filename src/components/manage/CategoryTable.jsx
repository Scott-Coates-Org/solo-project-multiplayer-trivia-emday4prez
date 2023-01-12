import styles from "./CategoryTable.module.css";
function CategoryTable() {
      const categories = [
            {
                  categoryId: "cat_1",
                  categoryName: "movies",
                  questionCount: 10,
                  lastUpdated: "just now",
            },
            {
                  categoryId: "cat_2",
                  categoryName: "music",
                  questionCount: 20,
                  lastUpdated: "10 minutes ago",
            },
            {
                  categoryId: "cat_3",
                  categoryName: "sports",
                  questionCount: 30,
                  lastUpdated: "last week",
            },
      ];
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
