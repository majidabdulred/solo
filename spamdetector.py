# Created by Om Ganesh Dahale

# IMPORTANT NOTE : SOLOLEARN PLAYGROUND TAKES ONLy 100 CHARACTERS OF INPUT BE SURE FULL MAIL IS TAKEN AS INPUT
 
# This code got #3 rank in the Contest and the most liked spam detector ,thanks every supporter

"""Spam Detector- by  Om Ganesh Dahale

It is based on a the following criteria-

1)  Many spam messages contain a URL that the recipient is encouraged to click on. URL detection 

 2) Spam emails often attempt to trick the recipient into giving out personal information.
 
 3) Cyrillic characters - many spam mails contains cyrillic characters to fool the spam detector. (This feature works on !Sololearn)
 
 4) Many spam mails contain Common word more than the regular ratio ,If it is higher than normal it may be spam .Spam Dictionary , example- discount, free ,delivery
 
 5)  Profanity Detection- i dont think mails containing inappropriate word will not be spam
 
 6)  Spam Guessing - Spammers often try not to put profantity and sensative words in mails to defend from spam detectors ,Spam guessing detects if a mail conatin more of advertising.Spam dictionary 
 
 Note- please dont get confused with spam dictionary and Spam Guessing , They are different."""

# spam words to check in how much quantity these words are used for spam guessing
spam_words = ['free','paid','discount','price','off','cheap','trade','.inc','limited','exchange','flat','latest','new','999','available','lose','win','loss','sponser','income','dob','loan','earn','money',]

# mails containing these sensitive words will directly marked as spam = Personal info Dictionary + Spam Dictionary + Url Dictionary
sensitive_words = ['password','credit','loan','debit','username','e-mail','http','g-mail','click','address','phone','privacy','policy','delivery','free','discount','99','sponser','loan','bank','details','pin','otp','subscribe','www.','enter','gmail','email','$','antivirus','+',]

# encrypted words for profanity filter
alp = "abcdefghijklmnopqrstuvwxyz*"
w1 = alp[18]+alp[4]+alp[23]
w2 = alp[15]+alp[14]+alp[17]+alp[13]
w3 = alp[23]+alp[23]+alp[23]
w4 = alp[13]+alp[20]+alp[3]+alp[4]
w5 = alp[1]+alp[14]+alp[14]+alp[1]
w6 = alp[21]+alp[0]+alp[6]+alp[4]+alp[13]+alp[0]
w7 = alp[21]+alp[0]+alp[6]+alp[8]+alp[13]+alp[0]
w8 = alp[1]+alp[20]+alp[19]+alp[19]
w9 = alp[15]+alp[4]+alp[13]+alp[8]+alp[18]
w10 = alp[7]+alp[14]+alp[13]+alp[4]+alp[24]+alp[12]+alp[14]+alp[14]+alp[13]
w11 = alp[26]
prof = [w1,w2,w3,w4,w5,w6,w7,w8,w9,w10,w11]

spam_score = 0 # spam score ,if it increases higher than the normal then mail will be marked as spam

mail = str(input("Enter mail here : "))
mail = mail.lower()
con = 0 #counter to change condition

# empty message detection
if mail == "" :
    print(True)
    con = 1

# For cyrillic characters - (Doesnt work on Sololearn playground as it supports only basics try using in IDLE or pydroid if you want it to work for cyrillic characters also)
c = "ёяшертыуиопющэъасдфгчйкльжзхцвбнмЁЯШЕРТЫУИОПЮЩЭЪАСДФГЧЙКЛЬЖЗХЦВБНМ"
if con == 0:
    for char in c:
        if char in mail:
            print(True)
            con = 1
            break 

# profantity filter( without breaking rules )
if con == 0:
    for word in prof:
         if word in mail:
              print(True)
              con = 1
              break

# for sensative words
if con == 0:
    for word in sensitive_words:
        if word in mail:
            print(True)
            con = 1
            break

# for spam score       
for word in spam_words:
    if word in mail:
        spam_score +=1

#Calculations for spam guessing        
mail = mail.split(" ")
spam_level = 100*spam_score/len(mail)

# for final decision - Spam Guessing
if con == 0:
    if spam_level >= 10:
        print(True)
    
    else:
        print(False)


