export default function UsersLoading() {
  return (
    <>
      <div className="usersSearchWrapper">
        <div className=" h-12 w-[350px] rounded-xl bg-slate-800 light:bg-slate-200 animate-pulse " />
      </div>

      <div className="usersTableWrapper">
        <table className="usersTable">
          <thead>
            <tr>
              {[...Array(6)].map((_, index) => (
                <th key={index}>
                  <div className=" h-4 w-20 mx-auto rounded bg-slate-700 light:bg-slate-300 animate-pulse " />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(6)].map((_, rowIndex) => (
              <tr key={rowIndex}>
                <td>
                  <div className=" h-4 w-6 mx-auto rounded bg-slate-700 light:bg-slate-300 animate-pulse " />
                </td>

                <td>
                  <div className=" h-4 w-28 mx-auto rounded bg-slate-700 light:bg-slate-300 animate-pulse " />
                </td>
                <td>
                  <div className=" h-4 w-20 mx-auto rounded bg-slate-700 light:bg-slate-300 animate-pulse" />
                </td>
                <td>
                  <div className=" h-4 w-16 mx-auto rounded-full bg-slate-700 light:bg-slate-300 animate-pulse " />
                </td>
                <td>
                  <div className=" h-4 w-24 mx-auto rounded bg-slate-700 light:bg-slate-300 animate-pulse " />
                </td>
                <td>
                  <div className="userActions">
                    {[...Array(3)].map((_, actionIndex) => (
                      <div
                        key={actionIndex}
                        className=" h-9 w-9 rounded-lg bg-slate-700 light:bg-slate-300 animate-pulse "
                      />
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="usersPagination">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className=" h-10 w-10 rounded-lg bg-slate-800 light:bg-slate-200 animate-pulse "
          />
        ))}
      </div>
    </>
  );
}
