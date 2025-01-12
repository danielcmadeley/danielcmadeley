import { ScrollArea } from '@/components/ui/scroll-area'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  return (
    <div className="col-span-2 flex flex-col max-w-3xl h-full">
      <div className="h-[25%] "></div>
      <div className="h-[75%] pt-4 pl-2 text-neutral-300">
        <ScrollArea className="h-full text-sm">
          <h2 className="text-xl font-bold mb-4">{slug}</h2>
          <div className="whitespace-pre-line">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa numquam distinctio nihil
            exercitationem aut! At quia nobis inventore error consequuntur incidunt accusantium
            nesciunt dolores delectus. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id
            minus accusantium dicta aliquid quos itaque fugit aut et provident est, tempora
            reprehenderit, voluptas cupiditate vel dolore incidunt ea? Hic, necessitatibus? Sequi
            porro repudiandae, odio totam voluptatum distinctio quia non qui similique, sit adipisci
            sed accusantium dolorem itaque? Dolorum culpa doloribus laudantium! Illum ipsam beatae
            veniam animi autem placeat. Dolore, illo? Voluptas consectetur optio nulla repudiandae
            voluptatem obcaecati, vitae libero sapiente fugit, sunt dolor dolores quos. Sapiente
            corporis quos sequi exercitationem, odit quidem alias nam delectus obcaecati, ex
            molestias quisquam numquam? Praesentium culpa eum iusto? Quos reprehenderit ex inventore
            possimus dicta libero necessitatibus quis sit perspiciatis, quidem id iste odio
            distinctio eaque optio, iure unde rem? Rem quia rerum nisi ipsam. Modi eos aut veniam
            soluta, aspernatur sunt ducimus in quia quaerat eius error exercitationem perferendis
            dolor quisquam delectus dignissimos enim magni dolores at? Amet aspernatur temporibus
            commodi ducimus voluptatem eum? Sed itaque sequi, illum odit incidunt sunt aspernatur
            nulla accusantium repudiandae doloribus optio dolorum deserunt adipisci quod omnis
            libero. Laudantium molestias dicta veniam harum ipsum natus, magni adipisci expedita
            commodi. Dolore nemo quasi, accusamus autem optio aliquid sed quisquam a cupiditate
            necessitatibus maiores dolor ratione error! Unde nam fugit aspernatur incidunt ab! Ad,
            porro illum molestiae delectus cupiditate dolore blanditiis. Adipisci quos ab odio
            obcaecati totam nihil, soluta optio animi fuga doloribus aliquid inventore suscipit
            dolorem qui numquam enim saepe repudiandae voluptate cum, quae sunt nam cupiditate?
            Officiis, consequuntur soluta! Architecto accusantium, esse error consectetur iusto
            eaque aperiam doloribus nihil excepturi recusandae earum, delectus laudantium laboriosam
            ducimus. Itaque, obcaecati! Fuga ab adipisci earum cum blanditiis. Quidem excepturi
            voluptas delectus autem! Itaque, fugit, aperiam unde explicabo quidem error quisquam at
            nisi assumenda voluptatum expedita vero, voluptas voluptatem voluptate illum dolores
            excepturi dicta. Perspiciatis expedita magni perferendis sit numquam officiis eveniet
            fugit? Fugiat cupiditate voluptas quas deleniti repellendus! Quas assumenda, delectus
            omnis possimus in eius minima quos exercitationem facilis minus, rerum inventore,
            voluptatum aut porro quisquam error eum quo at est incidunt? Debitis corrupti laborum,
            nam, blanditiis nemo qui saepe assumenda nulla praesentium ipsum excepturi, rerum magni!
            Illo dolores perferendis placeat incidunt molestias labore necessitatibus, voluptates id
            est nihil, officia, deserunt veniam. Magni perspiciatis expedita nesciunt maxime
            quisquam quo, quod natus dignissimos earum magnam odit illo sint dolorum placeat
            cupiditate sit dolores consequuntur iusto? Hic illo praesentium aspernatur fuga harum
            soluta magni? Nam cumque libero exercitationem incidunt sint numquam quo officiis
            commodi ullam? Voluptate animi excepturi aut voluptatum, amet quis ea sequi? Id eum est
            perferendis aspernatur facere enim, rem non laboriosam? Amet error rerum modi tempora.
            Architecto vitae incidunt modi commodi sint, odio sit labore, eius cupiditate mollitia
            est eaque iusto qui ducimus delectus atque cumque molestiae consequatur nobis? Iusto,
            magnam! Officia expedita ad sed illum doloremque hic officiis harum delectus! Odit
            expedita magnam rerum nulla fuga laboriosam aperiam aliquam tempore placeat corporis?
            Eveniet exercitationem nemo facilis quis in placeat porro! Officia quia veritatis vitae
            non assumenda temporibus quae? Odio reiciendis cum rem vitae esse! Molestiae quibusdam
            ducimus expedita aliquam suscipit, molestias veritatis labore cum, ea ipsam aliquid
            illum enim nostrum? Voluptatum sit asperiores quas aspernatur placeat dolorum, earum
            delectus similique ducimus laudantium accusamus officiis ullam optio doloribus. Iste,
            reiciendis neque doloribus doloremque cupiditate soluta, sequi fuga ratione ipsa
            repudiandae accusamus! Sint voluptate beatae possimus necessitatibus. Magni incidunt,
            modi accusantium, ipsa perspiciatis ullam totam quod ad quia nulla et corporis vel
            laborum quidem quibusdam architecto in vitae minus voluptate molestiae! Optio. Error
            blanditiis sed debitis maxime facilis omnis quia asperiores nam in ex provident
            adipisci, aliquid eum esse voluptas dolorum deserunt ab. Aut odio laborum necessitatibus
            exercitationem commodi aliquam, mollitia atque.
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
