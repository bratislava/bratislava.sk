import FileDownload from '@assets/images/account/file_download.svg'
import PaymentIcon from '@assets/images/account/payment-icon.svg'

import Button from '../../simple-components/Button'

type AccountSectionHeaderBase = {
  title: string
}

const TaxFeeSectionHeader = (props: AccountSectionHeaderBase) => {
  const { title } = props
  return (
    <div className="flex flex-col items-start bg-gray-50 sm:px-28 sm:py-6 p-4 mt-16 lg:mt-28 gap-4">
      <div className="flex items-center gap-0.5 cursor-pointer">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.8462 6.17917L11.667 5L6.66699 10L11.667 15L12.8462 13.8208L9.02533 10L12.8462 6.17917Z"
            fill="#333333"
          />
        </svg>
        <div className="underline text-p-sm">Naspäť na zoznam</div>
      </div>
      <div className="flex flex-col items-start gap-2 w-full h-full">
        <div className="text-p-base text-main-700 font-semibold sm:block hidden">
          Mesto Bratislava
        </div>
        <div className="flex flex-col items-start gap-4 h-full w-full">
          <div className="flex flex-row items-center gap-4 w-full">
            <div className="font-semibold text-h-2xl grow">Daň z nehnuteľností</div>
            <Button
              startIcon={<PaymentIcon />}
              variant="black"
              text="Zaplatiť daň"
              size="sm"
              className="sm:block hidden"
            />
            <Button
              startIcon={<FileDownload />}
              variant="black-outline"
              text="Stiahnuť PDF"
              size="sm"
              className="sm:block hidden"
            />
          </div>
          <div className="flex sm:flex-row flex-col sm:items-center items-start sm:gap-4 gap-1">
            <div className="flex gap-2">
              <div className="text-p-base font-semibold">Vytvorená</div>
              <div className="text-p-base font-normal">20. apríla 2023</div>
            </div>
            <div className="w-1.5 h-1.5 bg-black rounded-full sm:block hidden" />
            <div className="sm:text-p-base sm:font-bold text-p-sm font-normal">89,00 €</div>
            <div className="w-1.5 h-1.5 bg-black rounded-full sm:block hidden" />
            <div className="flex items-start gap-2">
              <div className="flex items-start gap-2">
                <div className="flex items-start gap-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.00004 16.17L4.83004 12L3.41504 13.415L9.00004 19L21 6.99996L19.585 5.58496L9.00004 16.17Z"
                      fill="#01843D"
                    />
                  </svg>
                  <div className="text-success-700 font-semibold">Uhradená</div>
                </div>
                <div>24. apríla 2023</div>
              </div>
            </div>
          </div>

          {/* for mobile version */}
          <div className="w-full sm:hidden block">
            <div className="flex flex-col gap-3">
              <Button
                startIcon={<PaymentIcon />}
                variant="black"
                text="Zaplatiť daň"
                size="sm"
                className="min-w-full"
              />
              <Button
                startIcon={<FileDownload />}
                variant="black-outline"
                text="Stiahnuť PDF"
                size="sm"
                className="min-w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaxFeeSectionHeader
