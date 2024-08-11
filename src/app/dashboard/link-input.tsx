export interface ILinkInputProps {
  required?: boolean
  maxLength?: number
  label: string
  url: string
  onChangeLabel: (url: string) => void
  onChangeURL: (label: string) => void
}

export function LinkInput({
  required = false,
  maxLength = 2000,
  label,
  url,
  onChangeLabel,
  onChangeURL,
}: ILinkInputProps) {
  return (
    <div className="flex flex-row gap-3">
      <input
        required={required}
        onChange={(event) => onChangeLabel(event.target.value)}
        value={label}
        type="text"
        maxLength={maxLength}
        name={label}
        className={`py-0.5 px-2 rounded-lg border-zinc-400 border focus:border-black outline-none text-lg shadow-md flex-1 mb-3`}
      />
      <input
        required={required}
        onChange={(event) => onChangeURL(event.target.value)}
        value={url}
        type="url"
        maxLength={maxLength}
        name={label}
        className={`py-0.5 px-2 rounded-lg border-zinc-400 border focus:border-black outline-none text-lg shadow-md flex-1 mb-3`}
      />
    </div>
  )
}
