<template>
    <div class="container mx-auto text-gray-200 mt-40 pb-12">
        <h1 class="text-6xl font-bold ml-6 md:ml-8 lg:ml-12 xl:ml-16 mb-12">FAQs</h1>
        <UAccordion size="xl" variant="ghost" class="px-8" :items="items">
            <template #default="{ item, index, open }">
                <UButton size="xl" variant="outline" :ui="{size: {xl: 'text-xl'}}" class="mb-4 *:hover:text-pink-500 py-3">
                    <span class="text-gray-200">{{ index + 1 }}. {{ item.label }}</span>
                    <template #trailing>
                        <UIcon
                            name="i-heroicons-chevron-up-20-solid"
                            class="w-8 h-8 ms-auto transform transition-transform duration-200"
                            :class="[open && 'rotate-180']"
                        />
                    </template>
                </UButton>
            </template>

            <template #item="{ item }">
                <p class="text-white text-lg leading-8 italic text-center p-4 tracking-wide">
                    " {{ item.content }} "
                </p>
            </template>

            <template #film-certificate="{ content }">
                <ul class="list-disc text-white text-lg px-8 leading-8 tracking-wide text-start italic *:mb-3">
                    <li>G (General) – the film is suitable for general audiences including children who are of a school-going age.</li>
                    <li>PG (Parental Guidance) – the film may be watched by unaccompanied children of any age.</li>
                    <li>12A – no one under the age of 12 may see the film unless they are accompanied by a guardian aged 18 or over.</li>
                    <li>15A – no one under the age of 15 may see the film unless they are accompanied by a guardian aged 18 or over.</li>
                    <li>16 – Films classified in this category are considered to be suitable only for persons aged 16 or over. Anyone under this age cannot be admitted to the film, regardless of whether a parent or guardian is present.</li>
                    <li>18 – No one under the age of 18 may see an 18 certificate film in the cinema. Children under the age of 12 years must be accompanied by an appropriate adult of 18 years and over or more detailed information on film classification please visit the IFCO website – www.ifco.ie</li>
                </ul>
            </template>
        </UAccordion>
    </div>
</template>

<script setup lang="ts">
const items = [{
  label: 'Is it safe to use your website for online booking?',
  defaultOpen: true,
  content: 'Yes. We use the Admit One Web Booking Engine which utilises 512-bit encrypted SSL (secure socket layer) technology, standard for all online Credit Card transactions. Various physical and electronic security measures are in place to ensure that your personal information is protected.'
}, {
  label: 'Is my personal information kept private and secure?',
  content: 'Yes, we’re very respectful here at Movies @ Dungarvan (formerly SGCDungarvan) about the privacy concerns of all of our customers. All the personal information given when registering/booking with us is kept on our secure servers and is never supplied or sold to any third party. However, we do sometimes need to use e-mail addresses/mobile phone numbers etc. in the event that we are required to do so, e.g. Credit Card Fraud or Garda Investigations.'
}, {
  label: 'Can I request a ticket cancellation by e-mail?',
  content: 'No, unfortunately we cannot cancel bookings via e-mail. If you think you’ve made a mistake with your booking or would like to cancel your tickets for whatever reason please call us on: 05845796. Alternatively, you can come to the box office and we will refund your tickets for you in person. Refunds will only be allowed up to 2 hours before the show starts.'
}, {
  label: 'Why is there a booking fee?',
  content: 'There is a non-refundable booking fee in place for Internet and Telephone bookings because we offer the facility to pre-book and guarantee your tickets, a service which warrants an additional small fee. This is standard in the entertainment/leisure industry, e.g. when booking concert or theatre tickets you are charged a booking fee. The fee is detailed when the booking is requested and while you still have the opportunity to cancel your transaction.'
}, {
  label: 'What does the film certificate mean?',
  slot: 'film-certificate',
  content: 'G (General) – the film is suitable for general audiences including children who are of a school-going age. PG (Parental Guidance) – the film may be watched by unaccompanied children of any age. 12A – no one under the age of 12 may see the film unless they are accompanied by a guardian aged 18 or over. 15A – no one under the age of 15 may see the film unless they are accompanied by a guardian aged 18 or over.1 16 – Films classified in this category are considered to be suitable only for persons aged 16 or over. Anyone under this age cannot be admitted to the film, regardless of whether a parent or guardian is present. 18 – No one under the age of 18 may see an 18 certificate film in the cinema. Children under the age of 12 years must be accompanied by an appropriate adult of 18 years and over or more detailed information on film classification please visit the IFCO website – www.ifco.ie'
}, {
  label: 'What different types of tickets do you offer?',
  content: 'Child, Adult, Student (Monday – Thursday with a valid student I.D.), Senior, Family (2 Adults & 2 Children aged 14 or under) and Kids Club. For ticket prices see above.'
}, {
  label: 'Do I require ID to purchase a cinema ticket?',
  content: 'In some cases, yes, you do. I.D. may be required for 12A, 15A, and especially 16 & 18 certificate films. A valid Third Level Student I.D. is required when purchasing student tickets. If there is a dispute, the cinema managerial decision is final.'
}, {
  label: 'How long before my movie do I need to give notice if I wish to cancel my tickets?',
  content: 'Due to the nature of our business we can only offer refunds/ticket cancellations up to 2 hours before the show start. No correspondence will be entered into as this is standard in all cinemas.'
}, {
  label: 'How do I know if my booking is confirmed?',
  content: 'At the end of your booking you will be given a unique reference number. Please make a note of this number and keep it safe, as you will need to bring it along with your card when you collect your tickets at the cinema.'
}, {
  label: 'Where can I collect my tickets from?',
  content: 'You can collect your tickets at any of the tills or from the Automated Ticket Machine using your credit card/reference number. If your booking contains a student ticket, you will only be able to collect your tickets from the box office as you will need to present a valid student I.D.'
}, {
  label: 'I’m only 15, why do I have to pay an adult price?',
  content: 'Customers who are aged fifteen and over are classified as adults for the purposes of the mandatory conditions on the exhibition of films relating to the protection of children from harm as contained in the Licensing Act'
}, {
  label: 'Can I bring a baby into a film? Do I have to pay for them?',
  content: 'We try to accommodate babies in our cinema as best we can although age restrictions do apply – babies will only be admitted into films with a G, PG or 12A certificate. We ask that you please respect all other customers enjoyment of the film and if your baby becomes distressed we ask that you leave the screen until they are settled, or we may have to ask you to leave. There is no charge for a baby in your arms, however if your child needs to take up a seat you will be asked to pay a child’s price. Don’t forget, we also have our Reel Parents screening on Tuesday mornings which show the latest film releases and are specifically for parents and babies.'
}]
</script>

<style scoped lang="postcss">
button {
    @apply text-white;
}
</style>