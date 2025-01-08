import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PlasticLocate, Place } from "../../../../types/locate.type";
import PlaceAutocomplete from "../../../../components/map/AutoComplete";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import InputWithLabel from "../../../../components/forms/InputWithLabel";
import SelectWithLabel, {
  SelectWithLabelProps,
} from "../../../../components/forms/SelectWithLabel";
import TextAreaWithLabel from "../../../../components/forms/TextAreaWithLabel";
import Modal from "../../../../components/Modal";
import {
  ArrowLeftCircleIcon,
  ExclamationTriangleIcon,
  PaperClipIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import ConfirmDeleteForm from "../../../../components/forms/ConfirmDeleteForm";
import { format } from "date-fns/format";
import { useAuth } from "@/context/AuthContext";

const inspectionStatuses = [
  { value: "0C37BB22-FBBD-4564-A55A-0857E492D9AF", text: "Preparing" },
  { value: "35B71557-6EC4-4ED4-8956-1E1E4B562C48", text: "Cancelled" },
  { value: "4A133D05-C639-4ADF-B540-BB9FC95255F0", text: "Review" },
  { value: "74E5C68B-6C13-4013-BA3A-3005FF2F2576", text: "Active" },
  { value: "8A500B63-DEF0-4478-BAB0-A9F10A353A55", text: "Complete" },
  { value: "A68F8789-1DB0-4C83-BF2B-6FFC7B536813", text: "Pending" },
];

type EditPlasticPipeLocateFormProps = {
  selectedLocate: PlasticLocate | null;
  handleCancel: () => void;
  handleSaveLocate: (locate: PlasticLocate, attachements: File[]) => void;
  handleDeleteLocate: (locate: PlasticLocate) => void;
  inspectors: SelectWithLabelProps["options"];
};

export default function EditPlasticPipeLocateForm({
  selectedLocate,
  handleCancel,
  handleSaveLocate,
  handleDeleteLocate,
  inspectors,
}: EditPlasticPipeLocateFormProps) {
  const { user } = useAuth();
  const [attachments, setAttachments] = useState<File[]>([]);
  const defaultLocate: PlasticLocate = {
    contactDetail: "",
    contactName: "",
    identifier: "",
    inspectionStatusId: "A68F8789-1DB0-4C83-BF2B-6FFC7B536813",
    inspectionStatusName: "Pending",
    scheduledDate: format(new Date().toISOString(), "yyyy-MM-dd HH:mm:ss"),
    plasticLocateId: "",
    requestorId: "",
    requestorName: "",
    notes: "",
    inspectorId: "",
    place: undefined,
  };

  const [locate, setLocate] = useState<PlasticLocate>(
    selectedLocate || defaultLocate,
  );

  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "inspectionStatusId") {
      if (value === "8A500B63-DEF0-4478-BAB0-A9F10A353A55") {
        setLocate((prev) => ({
          ...prev,
          completionDate: format(
            new Date().toISOString(),
            "yyyy-MM-dd HH:mm:ss",
          ),
          [name]: value,
          inspectionStatusName: "Completed",
        }));
      } else {
        const status = inspectionStatuses.find((item) => item.value == value);
        setLocate((prev) => ({
          ...prev,
          completionDate: "",
          [name]: value,
          inspectionStatusName: status?.text ?? "Status",
        }));
      }

      return;
    }

    if (value === "default") {
      setLocate((prev) => ({ ...prev, [name]: "" }));
    } else {
      setLocate((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePlaceChange = (place: Place) => {
    setLocate((prev) => ({
      ...prev,
      place: place,
    }));
  };

  function handleDateChanged(date: Date | null) {
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd HH:mm:ss");
      setLocate((prevLocate) => ({
        ...prevLocate,
        scheduledDate: formattedDate,
      }));
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (!locate.place) {
      // Find the form element and trigger its validity
      const form = e.currentTarget;
      const placeAutocompleteInput = form.querySelector<HTMLInputElement>(
        '[name="placeAutocomplete"]',
      );
      if (placeAutocompleteInput) {
        placeAutocompleteInput.setCustomValidity(
          "Please select a valid place.",
        );
        placeAutocompleteInput.reportValidity();
        placeAutocompleteInput.setCustomValidity("");
      }
      return;
    }

    handleSaveLocate(locate, attachments);
    handleCancel();
  }

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file && user) {
        setAttachments((prev) => [...prev, file]);
      }
      event.target.value = "";
    }
  };

  const handleInspectorChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value } = event.target;

    const inspector = inspectors.find((item) => item.value == value);

    setLocate((prevLocate) => ({
      ...prevLocate,
      inspectorId: value,
      inspectorName: inspector?.text ?? "Inspector",
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="flex flex-col items-center justify-center pb-5 border-b border-gray-900/10">
            <p className="mt-1 text-sm leading-6 text-gray-600">
              {selectedLocate
                ? `Please provide the updated information for ${selectedLocate?.identifier}`
                : "Please enter the required information to add a new plastic locate"}
            </p>
          </div>
          <div className="pb-12 border-b border-gray-900/10">
            <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-1 ">
              <div className="col-span-3">
                <PlaceAutocomplete
                  onPlaceSelect={handlePlaceChange}
                  value={locate.place?.formattedAddress}
                  required={true}
                />
              </div>

              <div className="col-span-3 mt-4">
                <InputWithLabel
                  id="contactName"
                  label="Contact Name"
                  type="text"
                  autoComplete="contactName"
                  required
                  placeholder="Enter contact name"
                  onChange={handleChange}
                  value={locate.contactName || ""}
                />
              </div>
              <div className="col-span-3 mt-4">
                <InputWithLabel
                  id="contactDetail"
                  label="Contact Details"
                  type="text"
                  autoComplete="contactDetails"
                  required
                  placeholder="Enter contact details"
                  onChange={handleChange}
                  value={locate.contactDetail || ""}
                />
              </div>

              <div className="mt-2">
                <SelectWithLabel
                  id="inspectionStatusId"
                  label="Status"
                  options={inspectionStatuses}
                  onChange={handleChange}
                  value={
                    locate?.inspectionStatusId ||
                    "A68F8789-1DB0-4C83-BF2B-6FFC7B536813"
                  }
                />
              </div>

              <div className="mt-2">
                <SelectWithLabel
                  id="inspectorId"
                  label="Inspector"
                  options={inspectors || []}
                  onChange={handleInspectorChange}
                  value={locate?.inspectorId || undefined}
                />
              </div>

              <div className="flex-col justify-center">
                <div className="col-span-3 mt-2">
                  <label
                    htmlFor="scheduledDate"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Scheduled Date
                  </label>
                  <div>
                    <DatePicker
                      selected={new Date(locate.scheduledDate)}
                      onChange={handleDateChanged}
                      className="block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      minDate={new Date()}
                      dateFormat="yyyy-MM-dd HH:mm:ss"
                      title={"Select the date for the inspection"}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-3 mt-4">
                <TextAreaWithLabel
                  id="notes"
                  label="Notes"
                  type="textarea"
                  onChange={handleChange}
                  value={locate.notes || ""}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-4 gap-x-4">
          <button
            type="button"
            className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
            onClick={() => {
              handleCancel();
            }}
          >
            <ArrowLeftCircleIcon className="w-6 h-6" />
          </button>
          <button
            type="button"
            className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
            onClick={openFileInput}
          >
            <PaperClipIcon className="w-6 h-6" />
            <input
              type="file"
              accept="image/*"
              capture="environment"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </button>
          {selectedLocate?.plasticLocateId && (
            <button
              id="deleteLocate"
              type="button"
              className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-white bg-red-500 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-400 sm:col-start-1 sm:mt-0 red-button "
              onClick={() => {
                setIsConfirmDeleteModalOpen(true);
              }}
            >
              <TrashIcon className="w-6 h-6" />
            </button>
          )}
          <button
            id="saveLocate"
            type="submit"
            className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
          >
            <PlusCircleIcon className="w-6 h-6" />
          </button>
        </div>
      </form>
      <Modal
        isOpen={isConfirmDeleteModalOpen}
        handleClose={() => setIsConfirmDeleteModalOpen(false)}
        title="Delete Locate"
        description=""
        icon={ExclamationTriangleIcon}
      >
        <ConfirmDeleteForm
          onConfirmDelete={() => {
            if (locate) {
              handleDeleteLocate(locate);
            }
          }}
          onCancel={() => setIsConfirmDeleteModalOpen(false)}
          element="locate"
        />
      </Modal>
    </>
  );
}
