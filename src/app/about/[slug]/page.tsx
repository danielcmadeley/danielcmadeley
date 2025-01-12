import { ScrollArea } from '@/app/components/ui/scroll-area'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  return (
    <div className="h-full w-full flex flex-col">
      <div className="h-[25%]"></div>
      <div className="h-[75%] w-full pt-4 pl-2">
        <ScrollArea className="h-full max-w-3xl">
          <div className="pr-4">
            <h1 className="text-2xl font-bold">{slug}</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum asperiores impedit
              quisquam fugiat similique eveniet odio facere ratione! Accusantium reprehenderit ullam
              architecto numquam labore voluptate amet et non quo doloribus. A architecto incidunt
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, animi esse?
              Praesentium iste quaerat quos ut voluptatem illo dolorem atque nobis iusto soluta
              corporis, error accusantium eius, itaque commodi nam. Recusandae, delectus voluptas
              vitae veniam, quam iusto veritatis non incidunt minima, fugit quis praesentium nihil
              cupiditate facilis error consequatur? Error cum maiores et voluptatem nam inventore
              ipsam aliquid cupiditate quos. At illo mollitia consequatur assumenda sequi reiciendis
              placeat incidunt eos obcaecati cum tenetur, voluptas consequuntur iusto? Perferendis
              voluptatibus doloribus, consequatur, accusamus nesciunt beatae esse totam veritatis
              cum facilis, eaque laudantium? Nesciunt laboriosam dolore ipsum velit eligendi nemo
              ipsa quisquam assumenda! Provident perspiciatis earum dolor ipsum, dolore, expedita
              animi voluptatem enim dolorum dolores rem neque in, sapiente doloribus laboriosam
              labore maiores? Magnam minima, soluta deleniti non reprehenderit, quisquam libero
              exercitationem perspiciatis molestias at placeat velit consectetur. Ad iste architecto
              recusandae voluptates minima qui veniam, totam sint dolore nisi reprehenderit, tempora
              fugit. Consequuntur, odit? Neque autem corrupti nobis! Maxime natus distinctio, sed
              tenetur laboriosam laborum molestias facere magnam consequatur ipsam quae ut et
              obcaecati fugiat aliquid rem voluptatum? Illum vitae illo alias! Aspernatur doloremque
              rem fuga voluptate debitis cumque minima quo, fugit, culpa consequatur accusamus
              officiis ullam a natus impedit consectetur non. Vero et, tenetur enim quo molestias ad
              nemo? Facilis, sequi? Hic ullam porro molestiae quod rerum necessitatibus saepe vel
              ipsam accusantium aperiam commodi fugiat delectus, possimus incidunt maxime dolore
              culpa dolor temporibus natus dolores excepturi aspernatur at. Assumenda, ipsam
              voluptatum. Doloremque corporis dolores labore culpa consequatur esse repellat dolorum
              deleniti! Vero aspernatur consequatur aperiam, quae natus blanditiis eaque voluptatum
              itaque cupiditate impedit perspiciatis reiciendis deleniti explicabo cum temporibus
              enim distinctio. Similique accusamus culpa eos reprehenderit, aspernatur quos amet
              ullam cum dicta quas suscipit, doloribus nobis quidem veniam voluptas eum rerum vitae
              facere maiores quia recusandae vel! Porro id rem blanditiis. Laudantium quam doloribus
              voluptatem, eius at, perferendis recusandae ipsa quos culpa minus, ullam fugit
              expedita nostrum quae eos velit? Eaque accusantium harum error veniam molestiae
              explicabo omnis minus non culpa. Eaque, enim eum. Aut laboriosam recusandae, eum sequi
              magni, ducimus culpa reprehenderit amet nesciunt, voluptatibus aliquid rerum odit
              molestias explicabo harum ad? Qui in esse nostrum neque quod inventore quae!
              Laudantium harum nam iusto nostrum est, ipsam eum illo quis placeat veniam atque fuga,
              aliquam quasi voluptate tenetur aspernatur quos sed reprehenderit? Voluptatum
              praesentium atque numquam quibusdam dicta alias quidem. Illum, amet! Perferendis omnis
              nesciunt esse, ratione doloremque dicta nostrum sunt dolorem. Alias explicabo illum
              neque consectetur recusandae quos, doloribus debitis modi, facilis earum id soluta
              optio. Voluptates, perferendis? Excepturi. Ipsum inventore possimus illum
              reprehenderit dolore recusandae fuga, iure quaerat sequi! Fugiat corrupti quae sunt
              doloremque tempora, ipsa nesciunt laudantium cupiditate sint non ad, molestiae ex quo.
              Itaque, omnis est. Aliquid quos ab dicta, consectetur consequatur, at quidem unde, sed
              ea obcaecati similique repellat. Id, ut eveniet veritatis nihil odio, enim
              voluptatibus rerum minus numquam, maxime doloremque quas sequi. Inventore? Ducimus
              autem non sunt eligendi at nostrum quia labore. Ducimus illo quae exercitationem
              tempore magni voluptatem hic, aliquid natus laudantium molestiae, porro veniam iure
              qui modi eum, harum dolorem eaque! Atque corrupti consequatur tenetur. Beatae nulla
              nesciunt eveniet voluptatem quos eos, assumenda maiores dolor repellendus nostrum
              fugit praesentium blanditiis maxime pariatur doloremque modi. Aliquid alias fugiat
              saepe maxime unde omnis. Ipsam repellendus ad explicabo iure. Tempore doloribus
              accusamus neque! Perferendis modi quos accusantium veritatis blanditiis assumenda
              optio dolore magnam doloribus, repellendus minima voluptatum soluta eligendi, corporis
              nemo praesentium magni nobis. Dolore vero et odit optio, magni ullam eius id aut
              molestias delectus voluptas quis minima quasi cum facere, ratione voluptate harum
              maiores repellendus. Commodi quam, officia provident necessitatibus earum neque?
            </p>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
