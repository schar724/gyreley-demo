import ThumbNail from "./Thumbnail";
import { Attachment } from "@/hooks/attachment";

type AttachmentDataProps = {
  attachmentData: Attachment[];
};

export default function AttachmentsCard({
  attachmentData,
}: AttachmentDataProps) {
  async function exportAttachment(attachment: Attachment) {
    const link = document.createElement("a");
    link.href = attachment.fileUrl;
    link.download = `${attachment.fileName}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="flex justify-between px-4 py-6 sm:px-6">
        <div>
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Attachments
          </h3>
        </div>
      </div>
      <div className="border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <ul
              role="list"
              className="border border-gray-100 divide-y divide-gray-100 rounded-md"
            >
              {attachmentData &&
                attachmentData.map((attachment, index) => {
                  return (
                    <li
                      key={index}
                      className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                    >
                      <div className="flex items-center flex-1 w-0">
                        <ThumbNail thumbnailUrl={attachment?.fileUrl} />
                        <div className="flex flex-1 min-w-0 gap-2 ml-4"></div>
                      </div>
                      <div className="flex-shrink-0 ml-4">
                        <a
                          href="#"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={(e) => {
                            e.preventDefault();
                            exportAttachment(attachment);
                          }}
                          id={attachment?.id}
                        >
                          Download
                        </a>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </dd>
        </dl>
      </div>
    </div>
  );
}
