import Button from "../Button";

type ConfirmDeleteFormProps = {
  onConfirmDelete: () => void;
  onCancel: () => void;
  element: string;
};

export default function ConfirmDeleteForm({
  onConfirmDelete,
  onCancel,
  element,
}: ConfirmDeleteFormProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onConfirmDelete();
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        {`Are you sure you want to delete this ${element}? This action cannot be undone`}
      </p>
      <div className="flex items-center justify-end mt-6 gap-x-6">
        <Button
          label="Cancel"
          type="button"
          className="text-gray-900 bg-white border hover:bg-gray-50"
          onClick={onCancel}
          data-autofocus
        />
        <Button
          label={`Delete ${element}`}
          type="submit"
          className="bg-red-600 hover:bg-red-500"
        />
      </div>
    </form>
  );
}
