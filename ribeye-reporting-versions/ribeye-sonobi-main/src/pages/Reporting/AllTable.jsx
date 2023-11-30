import { allTableConsts } from './constants';
import TableByCategory from './allTables/TableByCategory';

function AllTable({ filtered, selectedAdvertiser }) {
 

  return (
    <div className="gap-14 grid grid-cols-1 md:grid-cols-2 min-[1450px]:grid-cols-3 ">
      {allTableConsts.map((val) => (
        <TableByCategory
          key={val.id}
          selectedAdvertiser={selectedAdvertiser}
          filtered={filtered}
          value={val.value}
          type={
            val.value === 'Digital Channel' || val.value === 'Device Type'
              ? 'Pie'
              : 'Bar'
          }
          heading={val.value}
        />
      ))}
    </div>
  );
}

export default AllTable;
