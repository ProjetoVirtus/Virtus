import { v4 as uuidv4 } from 'uuid';

export default function LoadingPostListComponent() {
  return (
    <ul className="grid w-full auto-rows-auto justify-items-center gap-8 md:grid-cols-2">
      {Array.from({ length: 8 }).map(() => {
        return (
          <li key={uuidv4()} className="z-0 w-full">
            <div className="flex animate-pulse flex-col rounded-lg bg-slate-100 dark:bg-slate-600">
              <div className="flex gap-4 p-6">
                <div>
                  <div className="h-16 w-16 rounded-full bg-slate-200 dark:bg-slate-700 p-2" />
                </div>

                <div className="grid w-6/12">
                  <div className="h-6 w-full bg-slate-200 dark:bg-slate-700 text-lg font-semibold" />
                  <div className="w-8/12 bg-slate-200 dark:bg-slate-700" />
                </div>

                <div className="ml-auto h-6 w-24 bg-slate-200 dark:bg-slate-700" />
              </div>
              <div className="flex flex-col gap-2 p-6">
                <div className="h-8 bg-slate-200 dark:bg-slate-700" />
                <p className="min-h-[80px] bg-slate-200 dark:bg-slate-700" />
              </div>

              <div className="flex justify-between p-6 max-md:flex-col max-md:gap-2">
                <div className="h-10 rounded-md bg-slate-200 dark:bg-slate-700 px-4 py-2 text-white md:w-4/12" />
                <div className="h-10 rounded-md bg-slate-200 dark:bg-slate-700 px-4 py-2 md:w-6/12" />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
