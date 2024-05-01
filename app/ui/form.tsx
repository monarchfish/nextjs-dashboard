import clsx from 'clsx';

export type BaseInputType = {
  name: string;
  label: string;
  inputType: 'text' | 'number';
  placeholder?: string;
  Icon?: React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & { title?: string, titleId?: string } & React.RefAttributes<SVGSVGElement>>;
  errors?: string[];
  defaultValue?: string | number
};

export function BaseInput({ name, label, inputType, placeholder = '', Icon, errors = [], defaultValue = '' }: BaseInputType) {
  return (
    <>
      <div className="mb-4">
        <label htmlFor="caseName" className="mb-2 block text-sm font-medium">
          {label}
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id={name}
              name={name}
              type={inputType}
              placeholder={placeholder ? placeholder : `Enter ${name}`}
              className={clsx(
                'peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500',
                Icon ? 'pl-10' : '',
              )}
              aria-describedby="name-error"
              defaultValue={defaultValue}
            />
            {Icon && <Icon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />}
          </div>
        </div>
        <div id="name-error" aria-live="polite" aria-atomic="true">
          {errors.length > 0 &&
            errors.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))
          }
        </div>
      </div>
    </>
  );
}
