<template>
  <div class="slc-faq">
    <SLCFooter />
    <SLCMenuButton icon="back" to="/" />
    <div class="content" max-width>
      <h1>FAQ</h1>
      <h3>
        Muss ich jedes mal warten bis das Modell geladen wurde, wenn ich die App
        verwende?
      </h3>
      <p>
        Nein. Sobald das Modell einmal geladen wurde, wird es in deinem Cache
        gespeichert. Beim nächsten Besuch musst du dann nicht mehr warten.
      </p>
      <p>
        Dazu sei gesagt, dass die Verwendung dieser Anwendung im Inkognito Modus
        empfohlen ist. Dadurch wird das Modell zwar nicht gespeichert, aber du
        wirst immer das aktuellste verwenden können.
      </p>
      <h3>
        Was ist mit der Privatsphäre der Bilder?
      </h3>
      <p>
        Deine Bilder werden niemals zu einem externen Server gesendet. Alle
        Bilder die du verwendest, bleiben auf deinem Computer oder Smartphone.
        Das liegt daran, dass das Model auf deinem Gerät läuft.
      </p>
      <p>
        Die Technik, die dafür verantwortlich ist nennt sich Tensorflow.js und
        wurde von Google erstellt.
      </p>

      <h3>
        Was bedeuten die Prozente?
      </h3>

      <p>
        Diese sind Wahrscheinlichkeiten. Sie zeigen wie sicher das Modell ist,
        eine bestimmte Eigenschaft im Bild erkannt zu haben.
      </p>
      <p>
        Beispielsweise steht 23% Mel dafür, dass das Modell sich zu 23% sicher
        ist das es sich bei der Läsion auf dem Bild um Melanoma handelt.
      </p>

      <h3>Wie verwende ich die App auf meinem Smartphone?</h3>
      <p>
        Du kannst ein neues Foto aufnehmen oder eines aus deinem Fotoalbum
        wählen. Die folgenden Schritte sind für iOS, Android könnte ähnlich
        sein.
      </p>

      [ 1 ] <em>Ein Foto aufnehmen</em>
      <ul>
        <li>Besuche die Seite auf deinem Smartphone</li>
        <li>Klicke auf den blauen Knopf</li>
        <li>Wähle "Kamera"</li>
        <li>Nimm das Foto auf</li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import SLCFooter from "~/components/SLC-Footer.vue";
import SLCMenuButton from "~/components/SLC-MenuButton.vue";

@Component({
  components: {
    SLCFooter,
    SLCMenuButton
  }
})
export default class SLCFAQ extends Vue {}
</script>
<style>
.slc-faq .slc-footer {
  top: 0px;
  bottom: unset;
}
.slc-faq .slc-footer img {
  transform: rotate(180deg);
  height: calc(80px + env(safe-area-inset-top)) !important;
}
.slc-faq .content {
  padding: 75px 5vw env(safe-area-inset-top);
}

ul {
  list-style-type: none;
}
ul li:before {
  content: "\2014";
  position: absolute;
  margin-left: -20px;
}
</style>
