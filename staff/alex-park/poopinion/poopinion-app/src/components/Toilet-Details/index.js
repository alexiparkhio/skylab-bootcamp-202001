import React, { useState, useEffect } from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import MapView from 'react-native-maps'
import styles from './styles'
import moment from 'moment'

function ToiletDetails({ toilet, globalRating, user, onFav, onThumbUp, onThumbDown, onComment, onDelete, onDeleteToilet }) {
    const [comments, setComments] = useState(toilet.comments.slice(0, 5))
    const [userInfo, setUserInfo] = useState()

    useEffect(() => {
        setComments(toilet.comments.slice(0, 5))
    }, [toilet.comments])

    return (<>
        <ScrollView >
            <View style={styles.container}>
                {toilet.image ? (<Image style={styles.image} source={{ uri: toilet.image }} />)
                    :
                    (<Image style={styles.image} source={require('../../../assets/placeholder.jpg')} />)}
                <View style={styles.infoContainer}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <Text style={styles.place}>{toilet.place}</Text>
                            {toilet.score >= 4.5 && (<>
                                <View style={styles.poopRating}>
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                    <Text style={styles.rating}>({toilet.comments.length})</Text>
                                </View>
                            </>)}

                            {toilet.score >= 3.5 && toilet.score < 4.5 && (<>
                                <View style={styles.poopRating}>
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                    <Text style={styles.rating}>({toilet.comments.length})</Text>
                                </View>
                            </>)}

                            {toilet.score >= 2.5 && toilet.score < 3.5 && (<>
                                <View style={styles.poopRating}>
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                    <Text style={styles.rating}>({toilet.comments.length})</Text>
                                </View>
                            </>)}

                            {toilet.score >= 1.5 && toilet.score < 2.5 && (<>
                                <View style={styles.poopRating}>
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                    <Text style={styles.rating}>({toilet.comments.length})</Text>
                                </View>
                            </>)}

                            {toilet.score >= 0.5 && toilet.score < 1.5 && (<>
                                <View style={styles.poopRating}>
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRating.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                    <Text style={styles.rating}>({toilet.comments.length})</Text>
                                </View>
                            </>)}

                            {toilet.score < 0.5 && (<>
                                <View style={styles.poopRating}>
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                    <Image style={styles.smallPoop} source={require('../../../assets/poopRatingNot.png')} />
                                    <Text style={styles.rating}>({toilet.comments.length})</Text>
                                </View>
                            </>)}

                            <Text style={styles.postedAt}>Posted {moment(toilet.created).fromNow()}, by {toilet.publisher.name} {toilet.publisher.surname}</Text>
                        </View>
                        <TouchableOpacity style={styles.headerRight} onPress={() => { onFav(toilet.id) }}>
                            {user && toilet.isFavedBy.includes(user.id) ?
                                (<Image style={styles.favButton} source={require('../../../assets/faved.png')} />)
                                :
                                (<Image style={styles.favButton} source={require('../../../assets/fav.png')} />)
                            }
                        </TouchableOpacity>
                    </View>

                    <View style={styles.scoreContainer}>
                        <Text style={styles.score}>Score:</Text>
                        <View style={styles.allScoreInfo}>
                            <View style={styles.scoreLeft}>
                                <View style={styles.scoreLeftUp}>
                                    <Text style={styles.scoreMean}>{toilet.score ? toilet.score : 0}</Text>
                                </View>
                                <TouchableOpacity style={styles.scoreLeftDown} onPress={() => onComment(toilet.id)}>
                                    <Text style={styles.addRating}>+ Add/
                                    update a rating</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.scoreRight}>
                                <Text>Cleanness: <Text style={styles.smallScore}>{globalRating.cleannessMean}</Text></Text>
                                <Text>Aesthetics: <Text style={styles.smallScore}>{globalRating.looksMean}</Text></Text>
                                <Text>Payment required: {globalRating.paymentMean >= 0.5 ? (<Text style={styles.smallScore}>Yes</Text>) : (<Text style={styles.smallScore}>No</Text>)}</Text>
                                <Text>Multiple toilets: {globalRating.multipleMean >= 0.5 ? (<Text style={styles.smallScore}>Yes</Text>) : (<Text style={styles.smallScore}>No</Text>)}</Text>
                                <Text>Paper provision: {globalRating.paperMean >= 0.5 ? (<Text style={styles.smallScore}>Yes</Text>) : (<Text style={styles.smallScore}>No</Text>)}</Text>
                                <View style={styles.disabledContent}>
                                    <Text>Disabled toilet: </Text>
                                    {toilet.disabledToilet ? (<Image source={require('../../../assets/wheelchair.png')} style={styles.disabledLogo} />)
                                        :
                                        (<Image source={require('../../../assets/wheelchair.png')} style={styles.disabledLogoOpacity} />)}
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.mapContainer}>
                        <Text style={styles.location}>Location:</Text>
                        <MapView style={styles.mapStyle}
                            region={{
                                latitude: toilet.geolocation.latitude,
                                longitude: toilet.geolocation.longitude,
                                latitudeDelta: toilet.geolocation.latitudeDelta,
                                longitudeDelta: toilet.geolocation.longitudeDelta,
                            }}>
                            <MapView.Marker coordinate={{
                                latitude: toilet.geolocation.latitude,
                                longitude: toilet.geolocation.longitude
                            }} />
                        </MapView>
                    </View>

                    <View style={styles.commentsContainer}>
                        <Text style={styles.comments}>Last ratings/comments ({toilet.comments.length}):</Text>
                        {toilet.comments.length ?
                            (comments.map((comment, index) => (<>
                                <View key={index} style={styles.commentContainer}>
                                    <View style={styles.commentTop}>
                                        <View style={styles.commentTopLeft}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text onPress={() => {
                                                    userInfo === comment.publisher._id.toString() ? setUserInfo(undefined) : setUserInfo(comment.publisher._id.toString())
                                                }}>By: <Text style={styles.commentPublisher}>{comment.publisher.name} {comment.publisher.surname}</Text></Text>
                                                {comment.publisher.publishedToilets.length < 5 && comment.publisher.comments.length < 10 && <Image style={styles.profilePic} source={require('../../../assets/profile_bronze.png')} />}
                                                {comment.publisher.publishedToilets.length < 5 && comment.publisher.comments.length >= 10 && <Image style={styles.profilePic} source={require('../../../assets/profile_bronze_pro.png')} />}

                                                {comment.publisher.publishedToilets.length >= 5 && comment.publisher.publishedToilets.length < 10 && comment.publisher.comments.length < 10 && <Image style={styles.profilePic} source={require('../../../assets/profile_silver.png')} />}
                                                {comment.publisher.publishedToilets.length >= 5 && comment.publisher.publishedToilets.length < 10 && comment.publisher.comments.length >= 10 && <Image style={styles.profilePic} source={require('../../../assets/profile_silver_pro.png')} />}

                                                {comment.publisher.publishedToilets.length >= 10 && comment.publisher.comments.length < 10 && <Image style={styles.profilePic} source={require('../../../assets/profile_gold.png')} />}
                                                {comment.publisher.publishedToilets.length >= 10 && comment.publisher.comments.length >= 10 && <Image style={styles.profilePic} source={require('../../../assets/profile_gold_pro.png')} />}
                                            </View>
                                            <Text style={styles.commentCreated}>Posted {moment(comment.created).fromNow()}</Text>
                                        </View>
                                        <View style={styles.commentTopRight}>
                                            <Text style={styles.commentTopRightText}>Rating: <Text style={{ fontStyle: 'italic' }}>{parseFloat((comment.rating.overallRating * 0.5 + comment.rating.cleanness * 0.25 + comment.rating.looks * 0.25).toFixed(2))}</Text><Text style={{ fontStyle: 'italic' }}>/5</Text></Text>

                                        </View>
                                    </View>

                                    {userInfo === comment.publisher._id.toString() && (<>
                                        <View style={styles.userInfo}>
                                            <View
                                                style={styles.separator}
                                            />
                                            <Text><Text style={styles.bold}>Age</Text>: {moment().diff(comment.publisher.age, 'years')} years</Text>
                                            <Text><Text style={styles.bold}>Gender</Text>: {comment.publisher.gender}</Text>
                                            <Text><Text style={styles.bold}>Email</Text>: {comment.publisher.email}</Text>
                                            <Text><Text style={styles.bold}>Total Posts</Text>: {comment.publisher.publishedToilets.length}</Text>
                                            <Text><Text style={styles.bold}>Total Comments</Text>: {comment.publisher.comments.length}</Text>
                                            <Text><Text style={styles.bold}>User since</Text>: {moment(comment.publisher.created).fromNow()}</Text>
                                            <View
                                                style={styles.separator}
                                            />
                                        </View>
                                    </>)}

                                    <View style={styles.commentItself}>
                                        <Text style={styles.theComment}>"{comment.rating.textArea.length > 0 ? (<Text>{comment.rating.textArea}</Text>) : (<Text>(No text comment added)</Text>)}"</Text>
                                        <View style={styles.thumbs}>
                                            <View style={styles.thumbUpContainer}>
                                                <TouchableOpacity onPress={() => onThumbUp(comment.id.toString())}>
                                                    {user && user.thumbsUp.includes(comment.id.toString()) ? (
                                                        <Image style={styles.thumbUp} source={require('../../../assets/thumb-up.png')} />
                                                    )
                                                        :
                                                        (
                                                            <Image style={styles.thumbUp} source={require('../../../assets/thumb-up-unchecked.png')} />
                                                        )
                                                    }
                                                </TouchableOpacity>

                                                <Text>{comment.thumbsUp.length}</Text>
                                            </View>

                                            <View style={styles.thumbDownContainer}>
                                                <TouchableOpacity onPress={() => onThumbDown(comment.id.toString())}>
                                                    {user && user.thumbsDown.includes(comment.id.toString()) ? (
                                                        <Image style={styles.thumbDown} source={require('../../../assets/thumb-down.png')} />
                                                    )
                                                        :
                                                        (
                                                            <Image style={styles.thumbDown} source={require('../../../assets/thumb-down-unchecked.png')} />
                                                        )
                                                    }
                                                </TouchableOpacity>

                                                <Text>{comment.thumbsDown.length}</Text>
                                            </View>

                                            <TouchableOpacity style={styles.trashContainer} onPress={() => {
                                                Alert.alert('Warning!', `You are about to delete your rating for '${toilet.place}'. Are you sure you want to proceed?`, [
                                                    { text: 'Cancel', onPress: () => { } },
                                                    {
                                                        text: 'I do!', onPress: () => onDelete(toilet.id.toString(), comment.id.toString())
                                                    }
                                                ], { cancelable: false })
                                                }}>
                                                {user && comment.publisher._id.toString() === user.id.toString() && <Image style={styles.trash} source={require('../../../assets/delete.png')} />}
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                </View>
                            </>)))
                            :
                            (<Text>No comments to display...</Text>)}
                    </View>

                    {user && toilet.publisher.id.toString() === user.id.toString() && (<>
                        <TouchableOpacity onPress={() => {
                            Alert.alert('Warning!', `You are about to delete the toilet '${toilet.place}'. This will delete all info about the toilet as well as its ratings and comments. Are you sure you want to proceed?`, [
                                { text: 'Cancel', onPress: () => { }, style: 'cancel' },
                                {
                                    text: 'I do!', onPress: () => onDeleteToilet(toilet.id.toString())
                                }
                            ], { cancelable: false })
                        }} style={styles.deleteContainer}>
                            <Text style={styles.deleteButton}>🗑️ Delete this toilet</Text>
                        </TouchableOpacity>
                    </>)}

                </View>
            </View>
        </ScrollView>
    </>)
}

export default ToiletDetails