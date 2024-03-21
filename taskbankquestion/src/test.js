import React, { useState } from 'react';
import { List } from 'react-virtualized';

const MyComponent = ({ data }) => {
  const [filterOptions, setFilterOptions] = useState({
    option1: false,
    option2: false,
    option3: false,
  });

  const handleCheckboxChange = (option) => {
    setFilterOptions({
      ...filterOptions,
      [option]: !filterOptions[option],
    });
  };

  const filteredData = data.filter(item => {
    if (filterOptions.option1 && item.property === 'value1') {
      return true;
    }
    if (filterOptions.option2 && item.property === 'value2') {
      return true;
    }
    if (filterOptions.option3 && item.property === 'value3') {
      return true;
    }
    return false;
  });

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={filterOptions.option1}
          onChange={() => handleCheckboxChange('option1')}
        />
        Option 1
      </label>
      <label>
        <input
          type="checkbox"
          checked={filterOptions.option2}
          onChange={() => handleCheckboxChange('option2')}
        />
        Option 2
      </label>
      <label>
        <input
          type="checkbox"
          checked={filterOptions.option3}
          onChange={() => handleCheckboxChange('option3')}
        />
        Option 3
      </label>

      <List
        width={300}
        height={300}
        rowCount={filteredData.length}
        rowHeight={50}
        rowRenderer={({ index, key, style }) => (
          <div key={key} style={style}>
            {filteredData[index].name} - {filteredData[index].property}
          </div>
        )}
      />
    </div>
  );
};

export default MyComponent;
