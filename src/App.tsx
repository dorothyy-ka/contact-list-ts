import React, { useEffect, useState, useCallback } from "react";
import apiData, { Person } from "./api";
import PersonInfo from "./PersonInfo";

function App() {
  const [data, setData] = useState<Person[]>([]);
  const [selected, setSelected] = useState<Person[]>([]);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = useCallback(() => {
    setIsLoading(true);
    apiData()
      .then((data) => {
        setData((prevData) => [...prevData, ...data]);
        setShowError(false);
      })
      .catch(() => setShowError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const select = useCallback((person: Person) => {
    setSelected((prevSelected) => [...prevSelected, person]);
  }, []);

  const deselect = useCallback(
    (person: Person) => {
      const index = selected.map((el) => el.id).indexOf(person.id);

      setSelected((prevSelected) => {
        const selected = [...prevSelected];
        selected.splice(index, 1);
        return selected;
      });
    },
    [selected]
  );

  return (
    <div className="App">
      <div className="selected">Selected contacts: {selected.length}</div>
      <div className="list">
        {selected.map((personInfo, index) => (
          <PersonInfo
            key={personInfo.id}
            data={personInfo}
            onClick={deselect}
            isSelected
          />
        ))}
        <div>
          {data.map((personInfo) => {
            if (!selected.some((el) => el.id === personInfo.id)) {
              return (
                <PersonInfo
                  key={personInfo.id}
                  data={personInfo}
                  onClick={select}
                />
              );
            }
            return null
          })}
        </div>
        {showError && !isLoading && <div className="error">Error</div>}
        {isLoading ? (
          <div className="loader">Loading...</div>
        ) : (
          <button onClick={loadData}>
            {showError ? "Refetch" : "Load more"}
          </button>
        )}
      </div>
    </div>
  );
}

export default React.memo(App);
