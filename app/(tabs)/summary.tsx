import { Header } from '@/components/_header';
import { ScreenContainer } from '@/components/_screenContainer';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal} from 'react-native';
import { IconButton } from 'react-native-paper'

export default function SummaryScreen() 
{
    const [modalVisible, setModalVisible] = useState(false);
    
    const toggleChat = () => {
        setModalVisible(!modalVisible);
    }

    return (
        <ScreenContainer>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={toggleChat}
                style={styles.summaryUpperModal}
            >
                <View style={styles.summaryModal}>
                    <View style={styles.summaryChatContainer}>
                        <View style={styles.summaryTriangle}></View>

                        <View style={styles.chatBox}>
                            <Text style={styles.chatText}>Benvenuto nella chat! Come posso aiutarti?</Text>
                        </View>

                    </View>
                </View>

                <IconButton style={styles.summaryBotButtonModal} mode='contained-tonal'
                    icon="robot-confused" 
                    iconColor='#ffff' size={30} onPress={toggleChat}></IconButton>
            </Modal>
            <Header mini='Ecco a te il tuo' title='Riassunto'/>
            <ScrollView >
                <Text style={styles.summarySummary}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis, quidem laborum nisi repellat voluptatem assumenda officiis, eum, dignissimos ratione molestiae laboriosam dicta eveniet dolor quaerat. In excepturi fugit ex ratione!
                Molestias culpa possimus at voluptates sed? Quae voluptatibus facilis eius perferendis. Veritatis rem provident itaque dolor cupiditate doloremque error, totam illo molestias temporibus accusantium! Suscipit temporibus soluta quo ea quis.
                Placeat quam illo quaerat incidunt sequi. Quibusdam provident earum saepe in cum eveniet officiis enim odit praesentium, vero nesciunt quasi vel veritatis assumenda magni officia sequi minus. Cum, cumque aperiam!
                Officia maxime neque est nulla ducimus obcaecati velit, aliquam nobis corporis reiciendis amet iste molestias quo reprehenderit mollitia nesciunt. Quidem voluptate dolor recusandae eius corporis temporibus sequi quaerat repudiandae fuga!
                Placeat, eligendi a. Maxime reiciendis eius, labore fugit voluptatem, animi dicta architecto ratione quibusdam enim minus veritatis. Voluptatum eos non enim ab beatae vero iusto! Rem consequuntur inventore est repellat.
                Laborum, molestias ipsa at consectetur iste sequi quidem cupiditate dolores aut. Quia animi vitae itaque aspernatur est ullam obcaecati officia natus ipsum, incidunt, eum perferendis delectus iusto ipsa dolorum id.
                Repellendus aliquam voluptate cumque laudantium illo hic consectetur qui, sapiente ut velit nostrum fugiat. Magnam reprehenderit ab mollitia itaque maiores culpa velit reiciendis laboriosam error ratione iusto soluta, exercitationem animi?
                Ut ipsam fugit repellat, saepe, tempore similique a corporis ipsum id numquam laborum nulla illo consequatur laudantium aperiam molestias, cum dolorem amet optio aut quae! Ipsa aspernatur pariatur blanditiis perferendis.
                Facilis eum in fuga atque eos quisquam perspiciatis commodi exercitationem neque, assumenda dicta animi blanditiis qui, doloremque suscipit eaque nemo omnis quibusdam quasi inventore pariatur laudantium! Similique sit vero error.
                Dicta eum doloremque exercitationem, labore architecto molestias aut quisquam possimus aperiam, quas officiis, natus expedita nam explicabo aspernatur magnam harum laborum minima eos alias blanditiis dignissimos maxime. Blanditiis, quae nemo?
                Mollitia tenetur sunt dolore dolorem nesciunt nam explicabo, dignissimos quos maiores similique obcaecati molestias consequatur sapiente, iure labore. Nisi commodi deserunt ex amet? Laboriosam ab quisquam iusto expedita, officia voluptatibus.
                Temporibus veritatis expedita eum explicabo, accusantium voluptas. Sint laboriosam repellendus ad cumque fuga aut quaerat ipsum laborum veritatis nisi maiores nesciunt doloremque, ipsa voluptas necessitatibus dolorum natus beatae, atque praesentium.
                Mollitia sint neque possimus necessitatibus maiores autem incidunt, recusandae, blanditiis harum cupiditate doloribus amet commodi animi minima facilis laudantium odit nisi doloremque earum cum optio velit ipsa officia. Repellendus, dignissimos!
                Ipsam magnam eaque inventore et, ipsa odio voluptate excepturi iure nesciunt architecto dolore dolores commodi aspernatur quo fugiat, sunt blanditiis. Vero fugit aperiam laboriosam commodi nihil repellat quibusdam deleniti obcaecati.
                Sunt illum, excepturi eos ratione, quisquam saepe dolorum, laudantium ipsa eveniet voluptas quasi ullam cupiditate itaque rerum eaque explicabo quis officiis fuga possimus dolore quos exercitationem iusto est. Veritatis, fugiat?
                Soluta nobis nostrum libero maxime illo atque facilis at optio dolorem! Assumenda sunt voluptates, minus delectus repellat cum pariatur explicabo nulla? Sit quis libero facere? Consequuntur, asperiores quibusdam? Quasi, eligendi.
                Veritatis sint laboriosam, eaque deleniti commodi aliquid reprehenderit magni quisquam. Doloremque, provident repellendus optio laboriosam cupiditate excepturi vel nobis dolores veniam obcaecati itaque esse neque, aut odit magnam voluptates iure.
                Beatae sequi fuga deleniti assumenda saepe quasi ratione temporibus impedit perferendis pariatur odit quisquam corrupti, est molestiae sunt minima quos iure laboriosam esse facilis fugit laborum! Animi et totam excepturi!
                Fugit iusto voluptatem architecto unde velit animi recusandae eveniet assumenda dolore expedita vel quibusdam, deleniti modi odit sint debitis quisquam molestiae? Odio ad minima rerum. Animi dolor velit ipsa dicta?
                Obcaecati saepe quam neque distinctio, veritatis provident necessitatibus. Doloremque aliquid consectetur aspernatur nemo, praesentium qui voluptas totam omnis consequuntur nobis magni, placeat nostrum necessitatibus ullam quis incidunt velit culpa corrupti.
                Nobis ipsam facere eaque quam quisquam pariatur veritatis voluptatibus sed aliquid non quidem eum repudiandae voluptatum eligendi voluptatem libero reprehenderit dicta ut odio, iste maxime saepe. Beatae et quasi nisi?
                Exercitationem quod aspernatur quos deleniti tempore, ex, esse veniam corporis iure natus, amet fuga mollitia facilis temporibus! Accusantium qui dolorem, iusto eligendi consectetur tempora? Unde numquam odit molestiae exercitationem vitae?
                Maxime sequi laboriosam temporibus nihil qui, dolorum voluptatem, magnam voluptatum quas modi alias numquam blanditiis quaerat minus, delectus necessitatibus voluptatibus voluptate. Beatae possimus quasi corporis praesentium facere nam maxime rem?
                Quam accusantium quibusdam perspiciatis, doloribus et minus placeat quasi ab quisquam ex? Quaerat, maiores dolores. Consectetur, aliquam reiciendis sapiente blanditiis cumque in accusamus eos quibusdam amet dolorem fugiat adipisci animi.
                Consequuntur, laboriosam doloribus molestiae quidem possimus laudantium! Reprehenderit accusantium consectetur maiores sit sapiente! Necessitatibus reprehenderit, nesciunt cumque et maiores tempora nobis, placeat quibusdam repellat corrupti officia dolore omnis, consequuntur suscipit.
                Dicta explicabo, reiciendis libero culpa corporis corrupti, officia impedit repellat inventore, nobis nisi quis dignissimos aspernatur tempore doloremque quasi similique beatae distinctio fugit laudantium in. Quidem maxime repellat ipsam libero!
                Cupiditate velit quae ad dicta tempore, placeat, obcaecati quis consectetur, repudiandae necessitatibus exercitationem ab? Labore aut itaque dignissimos ut! Voluptatum accusantium molestias est rerum repellendus blanditiis beatae eaque explicabo iure?
                Dolores ad ut neque temporibus omnis officia illum, at alias ipsum magnam culpa repudiandae, enim eum laborum id modi reprehenderit? Excepturi magnam officia omnis incidunt, harum facere nobis. Illo, error!
                Ex neque asperiores odio expedita at tenetur, saepe harum deserunt soluta cupiditate molestias quas delectus necessitatibus iste voluptas est esse corporis excepturi omnis eius quisquam vero consequuntur laboriosam reiciendis? Facere!
                Iusto omnis recusandae facere. Rem voluptates voluptas quaerat mollitia nobis, voluptatibus reiciendis explicabo velit, quia exercitationem ea fuga ipsa recusandae? Molestias vel nesciunt a reprehenderit doloremque expedita dolore quisquam officiis!
                Autem eveniet quam, consequuntur cum porro animi provident minima minus repellat. Quidem, molestias? Pariatur sequi dolorum, voluptas nostrum aspernatur cum, alias incidunt modi neque dolorem distinctio fugiat eius, corporis deleniti?
                maiores sapiente doloribus error totam dignissimos suscipit ipsum deserunt ullam. Omnis facere in, iure nobis officiis eveniet!
                psum animi doloribus optio veniam et tempora distinctio atque quaerat! Maiores, perferendis? Itaque cum quod nobis quas aspernatur enim consequuntur quibusdam magnam asperiores quasi.
                </Text>
            </ScrollView>
            <IconButton style={styles.summaryBotButton} mode='contained-tonal'
                icon="robot-confused" 
                iconColor='#ffff' size={30} onPress={toggleChat}></IconButton>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    summarySummary:{
        marginTop: 20,
        fontSize: 16,
        color: '#FFF',
        paddingHorizontal: 20,
        width: '90%',
        lineHeight: 25
    },
    summaryBotButton: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        width: 50,
        height: 50,
        borderRadius: 50,
        marginHorizontal: 'auto',
        backgroundColor: '#e5383b',
    },
    summaryUpperModal:{
        position: 'absolute',
        bottom: 0,
    },
    summaryModal:{
        height: '60%',
        width: '80%',
        position: 'relative',
        zIndex: 99,
        borderRadius: 50,
        borderWidth: 1,
        bottom: 0,
        borderColor: '#fff'
    },
    summaryBotButtonModal:{
        position: 'absolute',
        bottom: 64,
        right: 15,
        width: 50,
        height: 50,
        borderRadius: 50,
        marginHorizontal: 'auto',
        backgroundColor: '#e5383b',
    },
    summaryChatContainer: {
        marginLeft: 20,
        position: 'absolute',
        bottom: 0
    },
    summaryTriangle: {
        width: 0,
        height: 0,
        borderLeftWidth: 20,
        borderRightWidth: 15,
        borderBottomWidth: 15,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#ffffff',
        alignSelf: 'center',
        marginBottom: 0,
        transform: [{'rotate': '15deg'}],
        position: 'absolute',
        bottom: 0,
        right: -10,
    },
    chatBox: {
        backgroundColor: '#232725',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    chatText: {
        fontSize: 16,
        marginBottom: 20,
        color: '#fff',
    },
    closeButton: {
        marginTop: 20,
        alignSelf: 'flex-end',
    },
})