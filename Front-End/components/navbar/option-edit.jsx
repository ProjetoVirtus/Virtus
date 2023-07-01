export default function EditButton({className, ...props}) {
    return <button className={`w-full text-left text-gray-600 hover:text-gray-900 hover:bg-gray-50 p-3 ${className || undefined}`} {...props}></button>
}