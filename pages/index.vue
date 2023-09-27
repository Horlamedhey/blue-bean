<script setup lang="ts">
import { MetaMaskSDK } from "@metamask/sdk";
interface InfoDetails {
  title: String;
  value: String;
}
const tokenDetails = ref<Array<InfoDetails>>([
  { title: "Token Name", value: "BEANZ TOKEN" },
  { title: "Token Ticker", value: "BEANZ" },
  { title: "Precision", value: "9" },
  { title: "Max. Supply", value: "1,000,000" },
]);

const preSaleDetails = ref<Array<InfoDetails>>([
  { title: "Price", value: "1 ETH = 30,000 BEANZ" },
  { title: "Soft cap", value: "15 ETH" },
  { title: "Hard cap", value: "30 ETH" },
  { title: "Total allocation", value: "300,000 BEANZ" },
]);
const { scrollToAnchor } = useAnchorScroll();
const isMobile = computed(() => {
  let check = false;

  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a,
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4),
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);

  return check;
});

const { $dayjs } = useNuxtApp();
const loading = ref(false);
let MMSDK;
const ethereum = ref(null);
const connect = async () => {
  loading.value = true;
  try {
    ethereum.value?.request({ method: "eth_requestAccounts", params: [] });
    // });
  } catch (error) {
    console.log(3, error);
  } finally {
    loading.value = false;
  }
};

// data, isLoading, error, pendingConnector

// const { connect, connectors } = useConnect();

// const { disconnect } = useDisconnect();
// , isLoading: isLoadingBalance

const { data: balance } = useBalance({
  address: "0x2a0BcADEdAdFEcFC30123139a15E331522033220",
});
const currTime = ref($dayjs());
const startTime = $dayjs("2023-10-16  00:00:00");
const endTime = $dayjs("2023-11-18 23:59:00");
const timeToStart = computed(() =>
  $dayjs.duration(startTime.diff(currTime.value)),
);
const timeToEnd = computed(() => $dayjs.duration(endTime.diff(currTime.value)));
const preSaleStarted = computed(() => currTime.value > startTime);
const preSaleEnded = computed(() => currTime.value > endTime);
const totalTokens = ref(300000);
const soldTokens = computed(() =>
  balance.value?.formatted ? Number(balance.value?.formatted) * 30000 : 0,
);
const leftTokens = computed(() => totalTokens.value - soldTokens.value);
const progress = computed(() => (soldTokens.value / totalTokens.value) * 100);
const formattedSoldTokens = computed(() =>
  new Intl.NumberFormat("en-US").format(soldTokens.value),
);
const formattedLeftTokens = computed(() =>
  new Intl.NumberFormat("en-US").format(leftTokens.value),
);

onMounted(() => {
  if (!preSaleEnded.value)
    setInterval(() => {
      currTime.value = $dayjs(currTime.value.add(1, "s"));
    }, 1000);
  MMSDK = new MetaMaskSDK({
    dappMetadata: { name: "Blue Bean", url: "https://blue-bean.vercel.app" },
    checkInstallationImmediately: isMobile.value,
    checkInstallationOnAllCalls: true,
  });
  setTimeout(() => {
    MMSDK.init().then(() => {
      ethereum.value = MMSDK.getProvider();
    });
  }, 300);
});
useHead({
  title: "Blue Bean",
  meta: [
    {
      name: "description",
      content:
        "BlueBean is a decentralized social Experiment on Base Ecosystem",
    },
  ],
  htmlAttrs: {
    lang: "en",
  },
});
</script>

<template>
  <div
    class="flex min-h-screen flex-col justify-between bg-[url('/bg.webp')] bg-cover bg-center pt-10"
  >
    <div>
      <header class="container mx-auto">
        <nav
          class="mx-auto flex h-11 items-center justify-between rounded-full bg-white/5 px-1 min-[375px]:h-16 min-[375px]:px-4 sm:h-20 sm:max-w-[95%] sm:px-10 xl:max-w-none"
        >
          <div class="flex items-center">
            <NuxtImg
              src="/blue-bean.webp"
              alt="logo"
              class="w-10 min-[375px]:w-12 lg:w-16"
            />
            <span class="font-bold min-[375px]:text-lg sm:text-xl lg:text-2xl">
              BLUE BEAN
            </span>
          </div>
          <button
            class="relative overflow-hidden rounded-full bg-gradient-to-r from-[#FF00F5] to-[#00DBDE] px-8 py-1 text-sm font-bold sm:px-10 sm:py-2 sm:text-base"
            @click="scrollToAnchor('beanz')"
          >
            <AtomsOverlay />
            <span class="relative">Buy BEANZ</span>
          </button>
        </nav>
      </header>

      <main>
        <section class="container mx-auto py-10">
          <div class="text-center">
            <h1
              class="inline-block whitespace-nowrap bg-gradient-to-r from-[#FF00F5] to-[#00DBDE] bg-clip-text font-red-rose text-[3rem] font-bold leading-none text-transparent sm:text-[6rem] lg:text-[160px]"
            >
              BLUE BEAN
            </h1>
            <p class="text-lg font-semibold italic sm:text-xl lg:text-2xl">
              "Solving World Hunger"
            </p>
          </div>
          <div
            class="flex flex-col items-center justify-center gap-4 lg:flex-row"
          >
            <NuxtImg src="/blue-bean.webp" alt="Blue Bean" width="382" />
            <div class="px-6">
              <p class="text-md max-w-xl sm:text-xl">
                BlueBean is a decentralized social Experiment on Base Ecosystem,
                where a Degen community builds and governs an ecosystem focused
                on fighting global hunger. The goal of the BEANZ token is to
                enable the DAO, acting as the currency of the ecosystem, while
                offering substantial utility and profit to holders. BlueBean
                Ecosystem will launch on Base Chain and subsequently other
                chains.
              </p>
              <a
                href="https://shorturl.at/rtvwQ"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Read more about Blue Bean."
              >
                <button
                  class="relative mt-6 overflow-hidden rounded-full bg-gradient-to-r from-[#FF00F5] to-[#00DBDE] px-10 py-2 font-semibold"
                >
                  <AtomsOverlay />
                  <span class="relative">Read Whitepaper</span>
                </button>
              </a>
            </div>
          </div>
        </section>

        <section class="bg-[#07121C] px-6 py-14 xl:px-0">
          <div class="container mx-auto">
            <ClientOnly>
              <div
                class="rounded-xl bg-gradient-to-r from-[#FF00F5] to-[#00DBDE] pt-[3px] sm:rounded-2xl"
              >
                <div class="rounded-xl bg-[#07121C] sm:rounded-2xl">
                  <div
                    class="rounded-xl bg-gradient-to-r from-[#FF00F5]/[0.12] to-[#00DBDE]/[0.12] py-6 text-center sm:rounded-2xl sm:pb-0 sm:pt-10 lg:pt-14"
                  >
                    <h2
                      class="text-xl font-semibold leading-none sm:text-2xl lg:text-3xl"
                    >
                      <span v-if="!preSaleStarted">Pre-sale starts in</span>
                      <span v-else-if="!preSaleEnded">Pre-sale ends in</span>
                      <span v-else>Pre-sale ended</span>
                    </h2>
                    <div
                      class="mt-6 grid grid-cols-5 grid-rows-2 px-6 text-center min-[425px]:px-12 sm:px-20 lg:mt-10 lg:px-36"
                    >
                      <div
                        class="col-span-1 text-3xl font-semibold sm:text-6xl lg:text-8xl"
                      >
                        <!-- Hours -->
                        <span v-if="!preSaleStarted">
                          {{
                            Math.floor(timeToStart.asHours())
                              .toString()
                              .padStart(2, "0")
                          }}
                        </span>
                        <span v-else-if="!preSaleEnded">
                          {{
                            Math.floor(timeToEnd.asHours())
                              .toString()
                              .padStart(2, "0")
                          }}
                        </span>
                        <span v-else>--</span>
                      </div>
                      <div
                        class="col-span-1 row-span-2 text-3xl font-semibold sm:text-6xl lg:text-8xl"
                      >
                        :
                      </div>
                      <div
                        class="col-span-1 text-3xl font-semibold sm:text-6xl lg:text-8xl"
                      >
                        <!-- Minutes -->
                        <span v-if="!preSaleStarted">
                          {{
                            timeToStart.minutes().toString().padStart(2, "0")
                          }}
                        </span>
                        <span v-else-if="!preSaleEnded">
                          {{ timeToEnd.minutes().toString().padStart(2, "0") }}
                        </span>
                        <span v-else>--</span>
                      </div>
                      <div
                        class="col-span-1 row-span-2 text-3xl font-semibold sm:text-6xl lg:text-8xl"
                      >
                        :
                      </div>
                      <div
                        class="col-span-1 text-3xl font-semibold sm:text-6xl lg:text-8xl"
                      >
                        <!-- Seconds -->
                        <span v-if="!preSaleStarted">
                          {{
                            timeToStart.seconds().toString().padStart(2, "0")
                          }}
                        </span>
                        <span v-else-if="!preSaleEnded">
                          {{ timeToEnd.seconds().toString().padStart(2, "0") }}
                        </span>
                        <span v-else>--</span>
                      </div>
                      <div
                        class="col-span-1 mt-2 text-xs font-semibold sm:text-base lg:text-xl"
                      >
                        Hours
                      </div>
                      <div
                        class="col-span-1 mt-2 text-xs font-semibold sm:text-base lg:text-xl"
                      >
                        Minutes
                      </div>
                      <div
                        class="col-span-1 mt-2 text-xs font-semibold sm:text-base lg:text-xl"
                      >
                        Seconds
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ClientOnly>
            <div
              class="mx-auto mt-20 rounded-[10px] bg-gradient-to-r from-[#FF00F5] to-[#00DBDE] p-[1px] xl:w-4/5"
            >
              <div class="rounded-[10px] bg-[#07121C]">
                <div
                  class="rounded-[10px] bg-gradient-to-r from-[#FF00F5]/[0.12] to-[#00DBDE]/[0.12] p-4 min-[425px]:p-10"
                >
                  <div
                    class="grid grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1 lg:gap-0"
                  >
                    <div class="col-span-1 lg:pr-28">
                      <h3 class="text-base font-semibold min-[425px]:text-lg">
                        Token details
                      </h3>
                      <div class="mt-2 flex justify-between lg:mt-4">
                        <ul class="flex w-full flex-col gap-1">
                          <li v-for="(tokenDetail, i) in tokenDetails" class="">
                            <div class="flex items-center gap-[6px]">
                              <div
                                class="h-[6px] w-[6px] rounded-full bg-white"
                              ></div>
                              <div class="grid flex-1 grid-cols-2">
                                <div
                                  class="text-xs font-light min-[425px]:text-base"
                                >
                                  {{ tokenDetail.title }} :
                                </div>
                                <div
                                  class="text-xs font-semibold min-[425px]:text-base"
                                >
                                  {{ tokenDetail.value }}
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div class="col-span-1">
                      <h3
                        class="text-base font-semibold min-[425px]:text-lg lg:pl-28"
                      >
                        Pre-sale details
                      </h3>
                      <div
                        class="relative mt-2 flex justify-between lg:mt-4 lg:pl-28"
                      >
                        <div
                          class="absolute left-0 hidden h-full w-[0.5px] bg-[#D2D2D2]/10 lg:block"
                        ></div>
                        <ul class="flex w-full flex-col gap-1">
                          <li
                            v-for="(preSaleDetail, i) in preSaleDetails"
                            class=""
                          >
                            <div class="flex items-center gap-[6px]">
                              <div
                                class="h-[6px] w-[6px] rounded-full bg-white"
                              ></div>
                              <div
                                class="grid flex-1 grid-cols-2 whitespace-nowrap"
                              >
                                <div
                                  class="text-xs font-light min-[425px]:text-base"
                                >
                                  {{ preSaleDetail.title }} :
                                </div>
                                <div
                                  class="text-xs font-semibold min-[425px]:text-base"
                                >
                                  {{ preSaleDetail.value }}
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="relative mt-12">
                    <div
                      v-if="soldTokens > 0"
                      class="mb-3 whitespace-nowrap text-xs text-[#00DBDE]/[0.7]"
                      :style="{ marginLeft: `calc(${progress}% - 2rem)` }"
                    >
                      Token sold
                    </div>

                    <div
                      class="absolute flex h-2 w-full justify-center rounded-full bg-white before:absolute before:h-5 before:w-[1px] before:bg-gradient-to-b before:from-transparent before:from-25% before:to-[#B77EA8] after:absolute after:right-[0.5px] after:h-5 after:w-[1px] after:bg-gradient-to-b after:from-transparent after:from-25% after:to-[#006566]"
                    >
                      <div
                        v-if="soldTokens > 0"
                        class="absolute bottom-0 left-0 h-5 w-[1px] bg-gradient-to-t from-transparent from-10% to-[#006566]"
                        :style="{ marginLeft: `calc(${progress}% - 1px)` }"
                      ></div>
                    </div>
                    <div
                      class="h-2 animate-pulse rounded-full bg-gradient-to-r from-[#FF00F5] from-50% via-[#00DBDE] via-100% to-white"
                      :style="{ width: `${progress}%` }"
                    ></div>
                    <div class="mt-3 grid grid-cols-3">
                      <div></div>
                      <div class="text-center text-xs text-[#E514FC]/[0.7]">
                        Soft cap
                      </div>
                      <div class="text-right text-xs text-[#00DBDE]/[0.7]">
                        Hard cap
                      </div>
                    </div>
                  </div>
                  <div class="mt-6 flex flex-col gap-4 sm:flex-row sm:gap-20">
                    <div>
                      <span
                        class="mr-3 text-sm font-light min-[425px]:text-base"
                      >
                        Tokens sold :
                      </span>
                      <span class="text-sm min-[425px]:text-base">
                        {{ formattedSoldTokens }} BEANZ
                      </span>
                    </div>
                    <div>
                      <span
                        class="mr-3 text-sm font-light min-[425px]:text-base"
                      >
                        Tokens left :
                      </span>
                      <span class="text-sm min-[425px]:text-base">
                        {{ formattedLeftTokens }} BEANZ
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-20 flex justify-center">
              <button
                id="beanz"
                class="relative w-[450px] max-w-xs overflow-hidden rounded-full bg-gradient-to-r from-[#FF00F5] to-[#00DBDE] py-3 text-lg font-semibold transition duration-700 disabled:opacity-20"
                :disabled="loading"
                @click="connect"
              >
                <AtomsOverlay />
                <span v-if="loading" class="relative">Loading...</span>
                <span v-else class="relative">Buy BEANZ</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
    <footer class="bg-[#07121C]">
      <div class="bg-[#C9E8E8]/[0.08] py-14">
        <div class="container mx-auto flex flex-col items-center gap-6">
          <div class="flex items-center">
            <NuxtImg src="/blue-bean.webp" width="64" alt="logo" />
            <span class="text-2xl font-bold">BLUE BEAN</span>
          </div>
          <div class="flex gap-6">
            <a
              href="https://t.me/+4jVYbWVFwjE2ZTBk"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join us on Telegram"
            >
              <span
                class="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2]"
              >
                <SvgoTelegram class="text-xl" />
              </span>
            </a>

            <a
              href="https://twitter.com/bluebeantoken?t=VsGcighc8a-TetXH7sciKA&s=09"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Twitter"
            >
              <span
                class="flex h-10 w-10 items-center justify-center rounded-full bg-[#1DA1F2]"
              >
                <SvgoTwitter class="text-xl" />
              </span>
            </a>
          </div>
          <span
            class="mt-6 text-center text-xs font-light text-[#C5CAD3] min-[425px]:text-sm"
          >
            Copyright ⓒ 2023 BLUE BEAN. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  </div>
</template>
